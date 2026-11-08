const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validation');

// Step 1: Login & Send OTP
router.post('/login', validateLogin, (req, res) => {
  req.body = req.validated;
  return authController.login(req, res);
});

// Step 2: Verify Login OTP
router.post('/verify-login-otp', authController.verifyLoginOtp);

// Step 1: Register & Send OTP
router.post('/register', validateSignup, (req, res) => {
  req.body = req.validated;
  return authController.register(req, res);
});

// Step 2: Verify Signup OTP
router.post('/verify-signup-otp', authController.verifySignupOtp);

// Resend OTP
router.post('/resend-otp', authController.resendOtp);

// Forgot Password with OTP
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPasswordWithOtp);

// Token Refresh & Logout
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router;
