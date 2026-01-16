// Models index file - Export all models for easy importing

const User = require('./User');
const { Exercise, WorkoutPlan, WorkoutSession, WorkoutTemplate } = require('./Workout');
const Meal = require('./Meal');
const Progress = require('./Progress');

module.exports = {
  // User models
  User,
  
  // Workout models
  Exercise,
  WorkoutPlan,
  WorkoutSession,
  WorkoutTemplate,
  
  // Meal models
  Meal,
  
  // Progress models
  Progress
}; 