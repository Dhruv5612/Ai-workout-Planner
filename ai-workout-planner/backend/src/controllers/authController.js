const jwt = require('jsonwebtoken');
const { User, Otp } = require('../models');
const { generateOtp, sendOtpEmail } = require('../services/emailService');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'dev_refresh_change_me';
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '30d';
const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME || 'refresh_token';

function signAccessToken(user) {
  return jwt.sign(
    { id: user._id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function signRefreshToken(user) {
  return jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}

function setRefreshCookie(res, token) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30
  });
}

/**
 * Step 1: Register (Initiate Signup with OTP)
 */
exports.register = async (req, res) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = (username || cleanEmail.split('@')[0]).trim();

    // Check if user already exists
    const existingByEmail = await User.findOne({ email: cleanEmail });
    if (existingByEmail) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const existingByUsername = await User.findOne({ username: cleanUsername });
    if (existingByUsername) {
      return res.status(409).json({ message: 'Username is already taken' });
    }

    // Generate 6-digit OTP
    const otp = generateOtp();

    // Store in Otp collection (expires in 10 minutes)
    await Otp.deleteMany({ email: cleanEmail, purpose: 'signup' });
    await Otp.create({
      email: cleanEmail,
      otp,
      purpose: 'signup',
      tempData: {
        email: cleanEmail,
        password,
        username: cleanUsername,
        firstName: firstName.trim(),
        lastName: lastName.trim()
      }
    });

    // Send OTP email
    await sendOtpEmail(cleanEmail, otp, 'signup');

    return res.status(200).json({
      requireOtp: true,
      email: cleanEmail,
      message: `Verification code sent to ${cleanEmail}`
    });
  } catch (err) {
    console.error('[Registration Error]:', err);
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

/**
 * Step 2: Verify Signup OTP & Create Account
 */
exports.verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP code are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    // Find valid OTP record
    const record = await Otp.findOne({ email: cleanEmail, purpose: 'signup', otp: cleanOtp });
    if (!record) {
      return res.status(400).json({ message: 'Invalid or expired OTP code' });
    }

    const { tempData } = record;
    if (!tempData) {
      return res.status(400).json({ message: 'Registration session expired. Please sign up again.' });
    }

    // Create verified user
    const user = new User({
      email: tempData.email,
      password: tempData.password,
      name: `${tempData.firstName} ${tempData.lastName}`,
      username: tempData.username,
      isEmailVerified: true
    });

    await user.save();

    // Clean up OTP
    await Otp.deleteMany({ email: cleanEmail, purpose: 'signup' });

    // Issue tokens
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setRefreshCookie(res, refreshToken);

    return res.status(201).json({
      message: 'Account verified and created successfully!',
      token: accessToken,
      user: user.getPublicProfile()
    });
  } catch (err) {
    console.error('[Verify Signup OTP Error]:', err);
    return res.status(500).json({ message: 'Verification failed', error: err.message });
  }
};

/**
 * Step 1: Login (Verify credentials & send OTP)
 */
exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const cleanInput = emailOrUsername.trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: cleanInput }, { username: cleanInput }]
    }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Credentials match! Generate and send OTP for 2-factor authentication
    const otp = generateOtp();
    await Otp.deleteMany({ email: user.email, purpose: 'login' });
    await Otp.create({
      email: user.email,
      otp,
      purpose: 'login'
    });

    await sendOtpEmail(user.email, otp, 'login');

    return res.json({
      requireOtp: true,
      email: user.email,
      message: `A 6-digit login verification code was sent to ${user.email}`
    });
  } catch (err) {
    console.error('[Login Error]:', err);
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

/**
 * Step 2: Verify Login OTP
 */
exports.verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP code are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    // Verify OTP record
    const record = await Otp.findOne({ email: cleanEmail, purpose: 'login', otp: cleanOtp });
    if (!record) {
      return res.status(400).json({ message: 'Invalid or expired OTP code' });
    }

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Clean up OTP
    await Otp.deleteMany({ email: cleanEmail, purpose: 'login' });

    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setRefreshCookie(res, refreshToken);

    return res.json({
      message: 'Login successful!',
      token: accessToken,
      user: user.getPublicProfile()
    });
  } catch (err) {
    console.error('[Verify Login OTP Error]:', err);
    return res.status(500).json({ message: 'Login verification failed', error: err.message });
  }
};

/**
 * Resend OTP
 */
exports.resendOtp = async (req, res) => {
  try {
    const { email, purpose = 'login' } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // If signup, check that existing pending record exists
    let existingTempData = null;
    if (purpose === 'signup') {
      const prevRecord = await Otp.findOne({ email: cleanEmail, purpose: 'signup' });
      if (prevRecord && prevRecord.tempData) {
        existingTempData = prevRecord.tempData;
      }
    }

    const otp = generateOtp();
    await Otp.deleteMany({ email: cleanEmail, purpose });
    await Otp.create({
      email: cleanEmail,
      otp,
      purpose,
      tempData: existingTempData
    });

    await sendOtpEmail(cleanEmail, otp, purpose);

    return res.json({
      message: `A fresh code has been sent to ${cleanEmail}`
    });
  } catch (err) {
    console.error('[Resend OTP Error]:', err);
    return res.status(500).json({ message: 'Failed to resend code', error: err.message });
  }
};

/**
 * Forgot Password - Send OTP
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      // For security, don't reveal if user does not exist
      return res.json({ message: 'If an account exists, a reset code was sent.' });
    }

    const otp = generateOtp();
    await Otp.deleteMany({ email: cleanEmail, purpose: 'reset_password' });
    await Otp.create({
      email: cleanEmail,
      otp,
      purpose: 'reset_password'
    });

    await sendOtpEmail(cleanEmail, otp, 'reset_password');

    return res.json({
      message: `Password reset code sent to ${cleanEmail}`
    });
  } catch (err) {
    console.error('[Forgot Password Error]:', err);
    return res.status(500).json({ message: 'Failed to process request', error: err.message });
  }
};

/**
 * Reset Password with OTP
 */
exports.resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    const record = await Otp.findOne({ email: cleanEmail, purpose: 'reset_password', otp: cleanOtp });
    if (!record) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    await Otp.deleteMany({ email: cleanEmail, purpose: 'reset_password' });

    return res.json({
      message: 'Password reset successfully! You can now log in.'
    });
  } catch (err) {
    console.error('[Reset Password Error]:', err);
    return res.status(500).json({ message: 'Failed to reset password', error: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const token = req.cookies[REFRESH_COOKIE_NAME];
    if (!token) {
      return res.status(401).json({ message: 'Missing refresh token' });
    }
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    const accessToken = signAccessToken(user);
    return res.json({ token: accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });
  return res.json({ message: 'Logged out successfully' });
};
