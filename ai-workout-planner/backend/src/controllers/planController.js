const { User, WorkoutPlan, Meal, Exercise } = require('../models');
const ai = require('../services/aiService');

exports.generatePlan = async (req, res) => {
  try {
    console.log('Generate plan request for user:', req.userId);
    const user = await User.findById(req.userId);
    if (!user) {
      console.log('User not found:', req.userId);
      return res.status(404).json({ message: 'User not found' });
    }

    const goal = (user.fitnessGoals && user.fitnessGoals[0]) || 'general-fitness';
    const level = user.fitnessLevel || 'beginner';
    const duration = user.workoutDuration || 45;

    console.log('Creating exercise for plan');
    const exercise = await Exercise.create({
      name: 'Bodyweight Circuit',
      category: 'strength',
      muscleGroups: ['full-body'],
      equipment: ['bodyweight'],
      difficulty: level,
      instructions: [ai.getWorkoutSuggestion()],
      isCustom: true
    });
    console.log('Exercise created:', exercise._id);

    console.log('Creating workout plan');
    const workoutPlan = await WorkoutPlan.create({
      user: user._id,
      name: `${level} ${goal} plan`,
      description: `Auto-generated ${goal} plan for ${user.username}`,
      type: 'mixed',
      difficulty: level,
      duration: { estimated: duration },
      targetMuscleGroups: ['full-body'],
      exercises: [{ exercise: exercise._id, sets: [{ reps: 12, duration: duration * 60 / 6, restTime: 60 }], totalSets: 1, order: 1 }],
      totalExercises: 1,
      isCustom: true,
      tags: [goal, level]
    });
    console.log('Workout plan created:', workoutPlan._id);

    console.log('Creating meal');
    const meal = await Meal.create({
      name: 'Balanced Bowl',
      description: 'Simple protein + carbs + veggies',
      category: 'lunch',
      difficulty: 'easy',
      servings: 1,
      ingredients: [
        { name: 'Chicken Breast', amount: 150, unit: 'g' },
        { name: 'Rice', amount: 150, unit: 'g' },
        { name: 'Mixed Veggies', amount: 150, unit: 'g' }
      ],
      nutrition: { calories: 600, protein: 45, carbs: 70, fat: 15 },
      created_by: user._id,
      is_public: false
    });
    console.log('Meal created:', meal._id);

    const today = new Date();
    const end = new Date(today);
    end.setDate(end.getDate() + 6);

    return res.status(201).json({
      message: 'Plan generated',
      workoutPlanId: workoutPlan._id,
      mealId: meal._id
    });
  } catch (err) {
    console.error('Generate plan error:', err);
    return res.status(500).json({ message: 'Failed to generate plan', error: err.message });
  }
};

exports.getCurrentPlan = async (req, res) => {
  try {
    console.log('Getting current plan for user:', req.userId);
    const workoutPlan = await WorkoutPlan.findOne({ user: req.userId }).sort({ _id: -1 });
    const meal = await Meal.findOne({ created_by: req.userId }).sort({ _id: -1 });
    
    if (!workoutPlan && !meal) {
      console.log('No plan found for user:', req.userId);
      return res.status(404).json({ message: 'No plan found' });
    }
    
    console.log('Current plan retrieved - workout:', workoutPlan?._id, 'meal:', meal?._id);
    return res.json({ workoutPlan, meal });
  } catch (err) {
    console.error('Get current plan error:', err);
    return res.status(500).json({ message: 'Failed to fetch plan', error: err.message });
  }
};

exports.getTodaySchedule = async (req, res) => {
  try {
    const today = new Date();

    console.log('Getting today schedule for user:', req.userId);
    const meal = await Meal.findOne({ created_by: req.userId }).sort({ _id: -1 });
    const workoutPlan = await WorkoutPlan.findOne({ user: req.userId }).sort({ _id: -1 });

    console.log('Today schedule retrieved - meal:', meal?._id, 'workout:', workoutPlan?._id);
    return res.json({
      date: today,
      meal: meal,
      workoutPlan
    });
  } catch (err) {
    console.error('Get today schedule error:', err);
    return res.status(500).json({ message: 'Failed to fetch today schedule', error: err.message });
  }
};
