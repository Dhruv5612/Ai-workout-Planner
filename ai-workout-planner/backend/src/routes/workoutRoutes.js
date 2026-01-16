const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.get('/', workoutController.getAllWorkouts);
router.post('/', workoutController.addWorkout);
router.get('/:id', workoutController.getWorkoutById);

module.exports = router; 