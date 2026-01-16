const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const auth = require('../middleware/authMiddleware');

router.use(auth);

router.get('/', mealController.getAllMeals);
router.post('/', mealController.addMeal);
router.get('/:id', mealController.getMealById);

module.exports = router; 