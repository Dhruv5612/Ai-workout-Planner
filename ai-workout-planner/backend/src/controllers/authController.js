const jwt = require('jsonwebtoken');
const User = require('../models').User;

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'dev_refresh_change_me';
const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN || '30d';
const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME || 'refresh_token';

function signAccessToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
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

exports.register = async (req, res) => {
  try {
    console.log('Register request body:', req.body);
    const { email, password, username, firstName, lastName } = req.body;

    if (!email || !password || !username || !firstName || !lastName) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    console.log('Checking for existing email:', email);
    const existingByEmail = await User.findOne({ email });
    if (existingByEmail) {
      console.log('Email already exists:', email);
      return res.status(409).json({ message: 'Email already in use' });
    }

    console.log('Checking for existing username:', username);
    const existingByUsername = await User.findOne({ username });
    if (existingByUsername) {
      console.log('Username already exists:', username);
      return res.status(409).json({ message: 'Username already in use' });
    }

    console.log('Creating new user:', { email, username, firstName, lastName });
    const user = new User({ 
      email, 
      password, 
      name: `${firstName} ${lastName}`,
      username: username || email.split('@')[0] // Use email prefix as username if not provided
    });
    await user.save();
    console.log('User saved successfully:', user._id);

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setRefreshCookie(res, refreshToken);

    return res.status(201).json({
      message: 'User registered successfully',
      token: accessToken,
      user: user.getPublicProfile(),
    });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('Login request body:', req.body);
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      console.log('Missing credentials');
      return res.status(400).json({ message: 'Missing credentials' });
    }

    console.log('Finding user by email or username:', emailOrUsername);
    const user = await User.findOne({ $or: [ { email: emailOrUsername }, { username: emailOrUsername } ] }).select('+password');
    if (!user) {
      console.log('User not found:', emailOrUsername);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Comparing password for user:', user._id);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', user._id);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();
    console.log('User login updated:', user._id);

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setRefreshCookie(res, refreshToken);

    return res.json({
      message: 'Login successful',
      token: accessToken,
      user: user.getPublicProfile(),
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Login failed', error: err.message });
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