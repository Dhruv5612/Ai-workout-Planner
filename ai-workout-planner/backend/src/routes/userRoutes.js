const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.get('/me', userController.getMe);
router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);

module.exports = router; 