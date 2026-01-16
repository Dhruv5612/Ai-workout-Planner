const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.post('/login', adminController.adminLogin);

// Protected routes (require admin authentication)
router.get('/dashboard/stats', adminAuth, adminController.getDashboardStats);
router.get('/users', adminAuth, adminController.getAllUsers);
router.get('/users/:userId', adminAuth, adminController.getUserById);
router.put('/users/:userId/subscription', adminAuth, adminController.updateUserSubscription);
router.delete('/users/:userId', adminAuth, adminController.deleteUser);

module.exports = router;
