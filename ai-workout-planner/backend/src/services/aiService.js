// aiService.js - AI service for workout and meal plan generation

/**
 * Get AI workout suggestion
 * @returns {string} Workout suggestion
 */
exports.getWorkoutSuggestion = () => {
  const suggestions = [
    'Try a 30-minute full-body workout!',
    'Start with 20 minutes of cardio followed by strength training',
    'Focus on compound movements like squats, push-ups, and planks',
    'Begin with a 5-minute warm-up, then 25 minutes of exercises',
    'Try interval training: 30 seconds work, 30 seconds rest',
    'Start with bodyweight exercises and gradually add resistance',
    'Focus on form over speed - quality movements are key',
    'Try a circuit: 3 rounds of 5 different exercises'
  ];
  
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

/**
 * Get AI meal suggestion
 * @param {string} goal - Fitness goal (weight-loss, muscle-gain, etc.)
 * @param {string} level - Fitness level (beginner, intermediate, advanced)
 * @returns {string} Meal suggestion
 */
exports.getMealSuggestion = (goal = 'general-fitness', level = 'beginner') => {
  const mealSuggestions = {
    'weight-loss': [
      'Focus on lean proteins, vegetables, and whole grains',
      'Try grilled chicken with steamed vegetables and quinoa',
      'Include plenty of fiber-rich foods to stay full longer',
      'Opt for smaller, more frequent meals throughout the day'
    ],
    'muscle-gain': [
      'Increase protein intake with chicken, fish, and legumes',
      'Add complex carbohydrates like brown rice and sweet potatoes',
      'Include healthy fats from nuts, avocados, and olive oil',
      'Eat within 30 minutes after your workout for optimal recovery'
    ],
    'general-fitness': [
      'Balance your plate with protein, carbs, and vegetables',
      'Try a colorful salad with lean protein and whole grain',
      'Include a variety of fruits and vegetables for nutrients',
      'Stay hydrated and limit processed foods'
    ]
  };
  
  const suggestions = mealSuggestions[goal] || mealSuggestions['general-fitness'];
  return suggestions[Math.floor(Math.random() * suggestions.length)];
};

/**
 * Generate personalized workout plan
 * @param {Object} user - User object with fitness data
 * @returns {Object} Generated workout plan
 */
exports.generateWorkoutPlan = (user) => {
  const { fitnessLevel = 'beginner', fitnessGoals = ['general-fitness'], workoutDuration = 45 } = user;
  
  const workoutTemplates = {
    'beginner': {
      duration: 30,
      exercises: [
        { name: 'Bodyweight Squats', sets: 3, reps: 12, rest: 60 },
        { name: 'Push-ups (knee)', sets: 3, reps: 8, rest: 60 },
        { name: 'Plank', sets: 3, reps: '30s', rest: 60 },
        { name: 'Walking Lunges', sets: 3, reps: 10, rest: 60 }
      ]
    },
    'intermediate': {
      duration: 45,
      exercises: [
        { name: 'Squats', sets: 4, reps: 15, rest: 45 },
        { name: 'Push-ups', sets: 4, reps: 12, rest: 45 },
        { name: 'Plank', sets: 4, reps: '45s', rest: 45 },
        { name: 'Lunges', sets: 4, reps: 12, rest: 45 },
        { name: 'Burpees', sets: 3, reps: 8, rest: 60 }
      ]
    },
    'advanced': {
      duration: 60,
      exercises: [
        { name: 'Jump Squats', sets: 4, reps: 20, rest: 30 },
        { name: 'Diamond Push-ups', sets: 4, reps: 15, rest: 30 },
        { name: 'Plank to Push-up', sets: 4, reps: 10, rest: 30 },
        { name: 'Jumping Lunges', sets: 4, reps: 15, rest: 30 },
        { name: 'Burpees', sets: 4, reps: 12, rest: 45 },
        { name: 'Mountain Climbers', sets: 4, reps: '30s', rest: 30 }
      ]
    }
  };
  
  return workoutTemplates[fitnessLevel] || workoutTemplates['beginner'];
};

/**
 * Generate personalized meal plan
 * @param {Object} user - User object with dietary preferences
 * @returns {Object} Generated meal plan
 */
exports.generateMealPlan = (user) => {
  const { fitnessGoals = ['general-fitness'], dietaryRestrictions = [] } = user;
  
  const mealTemplates = {
    'weight-loss': {
      calories: 1500,
      meals: [
        { type: 'breakfast', name: 'Greek Yogurt with Berries', calories: 300 },
        { type: 'lunch', name: 'Grilled Chicken Salad', calories: 400 },
        { type: 'dinner', name: 'Baked Salmon with Vegetables', calories: 500 },
        { type: 'snack', name: 'Apple with Almond Butter', calories: 200 }
      ]
    },
    'muscle-gain': {
      calories: 2500,
      meals: [
        { type: 'breakfast', name: 'Protein Pancakes', calories: 500 },
        { type: 'lunch', name: 'Chicken and Rice Bowl', calories: 600 },
        { type: 'dinner', name: 'Beef Stir-fry with Quinoa', calories: 700 },
        { type: 'snack', name: 'Protein Shake', calories: 300 },
        { type: 'snack', name: 'Mixed Nuts', calories: 400 }
      ]
    },
    'general-fitness': {
      calories: 2000,
      meals: [
        { type: 'breakfast', name: 'Oatmeal with Banana', calories: 400 },
        { type: 'lunch', name: 'Turkey Wrap with Vegetables', calories: 500 },
        { type: 'dinner', name: 'Grilled Fish with Sweet Potato', calories: 600 },
        { type: 'snack', name: 'Greek Yogurt', calories: 300 },
        { type: 'snack', name: 'Trail Mix', calories: 200 }
      ]
    }
  };
  
  const goal = fitnessGoals[0] || 'general-fitness';
  return mealTemplates[goal] || mealTemplates['general-fitness'];
};

module.exports = exports;
