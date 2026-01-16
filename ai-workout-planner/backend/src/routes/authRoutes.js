const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validation');

router.post('/login', validateLogin, (req, res) => {
  // Map validated fields into controller expectations
  req.body = req.validated;
  return authController.login(req, res);
});

router.post('/register', validateSignup, (req, res) => {
  req.body = req.validated;
  return authController.register(req, res);
});

router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

module.exports = router; 