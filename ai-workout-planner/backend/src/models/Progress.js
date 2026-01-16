const mongoose = require('mongoose');

const weightEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  weight: {
    value: {
      type: Number,
      required: true,
      min: 30,
      max: 300
    },
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    }
  },
  bodyFatPercentage: {
    type: Number,
    min: 0,
    max: 50
  },
  muscleMass: {
    type: Number,
    min: 0,
    max: 200
  },
  notes: String,
  photoUrl: String
});

const measurementEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  chest: Number,
  waist: Number,
  hips: Number,
  biceps: Number,
  forearms: Number,
  thighs: Number,
  calves: Number,
  neck: Number,
  shoulders: Number,
  unit: {
    type: String,
    enum: ['cm', 'inches'],
    default: 'cm'
  },
  notes: String,
  photoUrl: String
});

const fitnessTestSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  testType: {
    type: String,
    enum: ['push-ups', 'pull-ups', 'sit-ups', 'plank', 'mile-run', '5k-run', 'bench-press', 'squat', 'deadlift', 'custom'],
    required: true
  },
  result: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['reps', 'seconds', 'minutes', 'kg', 'lbs', 'miles', 'km'],
      required: true
    }
  },
  notes: String,
  isPersonalBest: {
    type: Boolean,
    default: false
  }
});

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    enum: ['workout', 'weight', 'measurement', 'streak', 'milestone', 'challenge'],
    required: true
  },
  icon: String,
  unlockedAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    current: {
      type: Number,
      default: 0
    },
    required: {
      type: Number,
      required: true
    }
  },
  isUnlocked: {
    type: Boolean,
    default: false
  }
});

const streakSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['workout', 'meal-plan', 'weight-tracking', 'measurement-tracking'],
    required: true
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  lastActivity: Date,
  startDate: Date
});

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    enum: ['weight', 'measurement', 'fitness', 'workout', 'nutrition', 'lifestyle'],
    required: true
  },
  target: {
    value: {
      type: Number,
      required: true
    },
    unit: String
  },
  current: {
    value: {
      type: Number,
      default: 0
    },
    unit: String
  },
  startDate: {
    type: Date,
    required: true
  },
  targetDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'failed', 'paused'],
    default: 'active'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  milestones: [{
    title: String,
    targetValue: Number,
    isCompleted: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }],
  notes: String
});

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Weight tracking
  weightHistory: [weightEntrySchema],
  currentWeight: {
    value: Number,
    unit: String
  },
  startingWeight: {
    value: Number,
    unit: String
  },
  targetWeight: {
    value: Number,
    unit: String
  },
  weightChange: {
    total: Number,
    weekly: Number,
    monthly: Number
  },
  
  // Body measurements
  measurements: [measurementEntrySchema],
  currentMeasurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    biceps: Number,
    forearms: Number,
    thighs: Number,
    calves: Number,
    neck: Number,
    shoulders: Number
  },
  
  // Fitness tests
  fitnessTests: [fitnessTestSchema],
  personalBests: [{
    testType: String,
    result: {
      value: Number,
      unit: String
    },
    date: Date
  }],
  
  // Achievements and streaks
  achievements: [achievementSchema],
  streaks: [streakSchema],
  
  // Goals
  goals: [goalSchema],
  activeGoals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal'
  }],
  
  // Workout statistics
  workoutStats: {
    totalWorkouts: {
      type: Number,
      default: 0
    },
    totalDuration: {
      type: Number,
      default: 0 // in minutes
    },
    totalCaloriesBurned: {
      type: Number,
      default: 0
    },
    currentWeekWorkouts: {
      type: Number,
      default: 0
    },
    currentMonthWorkouts: {
      type: Number,
      default: 0
    },
    longestWorkoutStreak: {
      type: Number,
      default: 0
    },
    favoriteWorkoutTypes: [{
      type: String,
      count: Number
    }]
  },
  
  // Nutrition statistics
  nutritionStats: {
    totalMeals: {
      type: Number,
      default: 0
    },
    totalCaloriesConsumed: {
      type: Number,
      default: 0
    },
    averageDailyCalories: {
      type: Number,
      default: 0
    },
    currentWeekCalories: {
      type: Number,
      default: 0
    },
    currentMonthCalories: {
      type: Number,
      default: 0
    },
    macroAverages: {
      protein: Number,
      carbs: Number,
      fat: Number
    }
  },
  
  // Progress insights
  insights: {
    weeklyProgress: [{
      week: Date,
      weightChange: Number,
      workoutCount: Number,
      caloriesBurned: Number,
      goalsProgress: Number
    }],
    monthlyProgress: [{
      month: Date,
      weightChange: Number,
      workoutCount: Number,
      caloriesBurned: Number,
      goalsProgress: Number
    }],
    trends: {
      weightTrend: {
        type: String,
        enum: ['decreasing', 'stable', 'increasing']
      },
      workoutTrend: {
        type: String,
        enum: ['improving', 'stable', 'declining']
      },
      nutritionTrend: {
        type: String,
        enum: ['improving', 'stable', 'declining']
      }
    }
  },
  
  // AI-generated insights
  aiInsights: [{
    date: Date,
    insight: String,
    category: {
      type: String,
      enum: ['progress', 'recommendation', 'motivation', 'warning']
    },
    actionable: Boolean,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  }],
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
progressSchema.index({ user: 1 });
progressSchema.index({ 'weightHistory.date': -1 });
progressSchema.index({ 'measurements.date': -1 });
progressSchema.index({ 'fitnessTests.date': -1 });

// Virtual for BMI calculation
progressSchema.virtual('bmi').get(function() {
  if (this.currentWeight && this.currentWeight.value && this.currentWeight.unit === 'kg') {
    // We need height from user profile to calculate BMI
    return null;
  }
  return null;
});

// Virtual for progress percentage
progressSchema.virtual('overallProgress').get(function() {
  if (this.goals.length === 0) return 0;
  
  const totalProgress = this.goals.reduce((sum, goal) => sum + goal.progress, 0);
  return Math.round(totalProgress / this.goals.length);
});

// Pre-save middleware to update current values
progressSchema.pre('save', function(next) {
  // Update current weight
  if (this.weightHistory && this.weightHistory.length > 0) {
    const latestWeight = this.weightHistory[this.weightHistory.length - 1];
    this.currentWeight = latestWeight.weight;
  }
  
  // Update current measurements
  if (this.measurements && this.measurements.length > 0) {
    const latestMeasurements = this.measurements[this.measurements.length - 1];
    this.currentMeasurements = {
      chest: latestMeasurements.chest,
      waist: latestMeasurements.waist,
      hips: latestMeasurements.hips,
      biceps: latestMeasurements.biceps,
      forearms: latestMeasurements.forearms,
      thighs: latestMeasurements.thighs,
      calves: latestMeasurements.calves,
      neck: latestMeasurements.neck,
      shoulders: latestMeasurements.shoulders
    };
  }
  
  // Update weight change calculations
  if (this.startingWeight && this.currentWeight && this.startingWeight.unit === this.currentWeight.unit) {
    this.weightChange.total = this.currentWeight.value - this.startingWeight.value;
  }
  
  next();
});

// Static method to find progress by user
progressSchema.statics.findByUser = function(userId) {
  return this.findOne({ user: userId });
};

// Method to add weight entry
progressSchema.methods.addWeightEntry = function(weightData) {
  this.weightHistory.push(weightData);
  
  // Update current weight
  this.currentWeight = weightData.weight;
  
  // Calculate weight changes
  if (this.startingWeight && this.startingWeight.unit === weightData.weight.unit) {
    this.weightChange.total = weightData.weight.value - this.startingWeight.value;
  }
  
  return this.save();
};

// Method to add measurement entry
progressSchema.methods.addMeasurementEntry = function(measurementData) {
  this.measurements.push(measurementData);
  
  // Update current measurements
  this.currentMeasurements = {
    chest: measurementData.chest,
    waist: measurementData.waist,
    hips: measurementData.hips,
    biceps: measurementData.biceps,
    forearms: measurementData.forearms,
    thighs: measurementData.thighs,
    calves: measurementData.calves,
    neck: measurementData.neck,
    shoulders: measurementData.shoulders
  };
  
  return this.save();
};

// Method to add fitness test
progressSchema.methods.addFitnessTest = function(testData) {
  this.fitnessTests.push(testData);
  
  // Check if it's a personal best
  if (testData.isPersonalBest) {
    this.personalBests.push({
      testType: testData.testType,
      result: testData.result,
      date: testData.date
    });
  }
  
  return this.save();
};

// Method to update goal progress
progressSchema.methods.updateGoalProgress = function(goalId, newProgress) {
  const goal = this.goals.id(goalId);
  if (goal) {
    goal.progress = Math.min(100, Math.max(0, newProgress));
    
    if (goal.progress >= 100) {
      goal.status = 'completed';
    }
    
    return this.save();
  }
  return Promise.reject(new Error('Goal not found'));
};

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress; 