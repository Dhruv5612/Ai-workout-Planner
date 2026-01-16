const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.post('/generate', planController.generatePlan);
router.get('/current', planController.getCurrentPlan);
router.get('/today', planController.getTodaySchedule);

module.exports = router;
