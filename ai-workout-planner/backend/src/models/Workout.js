const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'balance', 'sports-specific'],
    required: true
  },
  muscleGroups: [{
    type: String,
    enum: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'abs', 'obliques', 'glutes', 'quadriceps', 'hamstrings', 'calves', 'full-body']
  }],
  equipment: [{
    type: String,
    enum: ['bodyweight', 'dumbbells', 'barbell', 'kettlebell', 'resistance-bands', 'machine', 'cable', 'medicine-ball', 'stability-ball', 'foam-roller', 'none']
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  instructions: [String],
  videoUrl: String,
  imageUrl: String,
  caloriesPerMinute: Number,
  isCustom: {
    type: Boolean,
    default: false
  }
});

const setSchema = new mongoose.Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
    required: true
  },
  sets: [{
    reps: {
      type: Number,
      min: 1,
      max: 1000
    },
    weight: {
      type: Number,
      min: 0,
      max: 1000
    },
    weightUnit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg'
    },
    duration: {
      type: Number, // in seconds
      min: 1
    },
    distance: {
      type: Number, // in meters
      min: 0
    },
    restTime: {
      type: Number, // in seconds
      min: 0,
      default: 60
    },
    rpe: {
      type: Number, // Rate of Perceived Exertion (1-10)
      min: 1,
      max: 10
    },
    notes: String
  }],
  totalSets: {
    type: Number,
    default: 1
  },
  order: {
    type: Number,
    required: true
  }
});

const workoutPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'hiit', 'endurance', 'recovery', 'mixed'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  duration: {
    estimated: {
      type: Number, // in minutes
      required: true,
      min: 5,
      max: 300
    },
    actual: Number // actual time taken
  },
  targetMuscleGroups: [{
    type: String,
    enum: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms', 'abs', 'obliques', 'glutes', 'quadriceps', 'hamstrings', 'calves', 'full-body']
  }],
  exercises: [setSchema],
  totalExercises: {
    type: Number,
    default: 0
  },
  caloriesBurned: {
    estimated: Number,
    actual: Number
  },
  isCustom: {
    type: Boolean,
    default: false
  },
  isTemplate: {
    type: Boolean,
    default: false
  },
  tags: [String],
  notes: String
});

const workoutSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkoutPlan',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  startTime: Date,
  endTime: Date,
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'skipped', 'cancelled'],
    default: 'planned'
  },
  exercises: [{
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    sets: [{
      reps: Number,
      weight: Number,
      weightUnit: String,
      duration: Number,
      distance: Number,
      restTime: Number,
      rpe: Number,
      notes: String,
      isCompleted: {
        type: Boolean,
        default: false
      }
    }],
    notes: String,
    isCompleted: {
      type: Boolean,
      default: false
    }
  }],
  performance: {
    totalSets: {
      type: Number,
      default: 0
    },
    completedSets: {
      type: Number,
      default: 0
    },
    totalReps: {
      type: Number,
      default: 0
    },
    totalWeight: {
      type: Number,
      default: 0
    },
    totalDuration: {
      type: Number,
      default: 0
    }
  },
  feedback: {
    difficulty: {
      type: String,
      enum: ['too-easy', 'just-right', 'too-hard']
    },
    enjoyment: {
      type: Number,
      min: 1,
      max: 10
    },
    energy: {
      type: Number,
      min: 1,
      max: 10
    },
    notes: String
  },
  aiGenerated: {
    type: Boolean,
    default: false
  },
  aiPrompt: String,
  aiResponse: String
});

const workoutTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  category: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'hiit', 'endurance', 'recovery', 'mixed'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  targetAudience: [{
    type: String,
    enum: ['beginners', 'intermediates', 'advanced', 'seniors', 'athletes', 'rehabilitation']
  }],
  exercises: [setSchema],
  estimatedDuration: Number,
  caloriesBurned: Number,
  isPublic: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  usageCount: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
});

// Indexes for better query performance
workoutPlanSchema.index({ user: 1 });
workoutSessionSchema.index({ user: 1, date: -1 });
workoutSessionSchema.index({ status: 1 });
workoutSessionSchema.index({ 'workoutPlan.type': 1 });
workoutTemplateSchema.index({ category: 1, difficulty: 1 });
workoutTemplateSchema.index({ isPublic: 1 });

// Virtual for workout duration
workoutSessionSchema.virtual('duration').get(function() {
  if (this.startTime && this.endTime) {
    return (this.endTime - this.startTime) / 1000 / 60; // in minutes
  }
  return null;
});

// Virtual for completion percentage
workoutSessionSchema.virtual('completionPercentage').get(function() {
  if (this.exercises.length === 0) return 0;
  const completedExercises = this.exercises.filter(ex => ex.isCompleted).length;
  return Math.round((completedExercises / this.exercises.length) * 100);
});

// Pre-save middleware to update performance metrics
workoutSessionSchema.pre('save', function(next) {
  if (this.exercises) {
    this.performance.totalSets = this.exercises.reduce((total, ex) => {
      return total + (ex.sets ? ex.sets.length : 0);
    }, 0);
    
    this.performance.completedSets = this.exercises.reduce((total, ex) => {
      return total + (ex.sets ? ex.sets.filter(s => s.isCompleted).length : 0);
    }, 0);
  }
  next();
});

// Static method to find workouts by user and date range
workoutSessionSchema.statics.findByUserAndDateRange = function(userId, startDate, endDate) {
  return this.find({
    user: userId,
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: -1 });
};

// Static method to find completed workouts
workoutSessionSchema.statics.findCompleted = function(userId) {
  return this.find({
    user: userId,
    status: 'completed'
  }).sort({ date: -1 });
};

// Method to mark workout as completed
workoutSessionSchema.methods.completeWorkout = function() {
  this.status = 'completed';
  this.endTime = new Date();
  this.exercises.forEach(exercise => {
    exercise.isCompleted = true;
    exercise.sets.forEach(set => {
      set.isCompleted = true;
    });
  });
  return this.save();
};

// Create models
const Exercise = mongoose.model('Exercise', exerciseSchema);
const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);
const WorkoutSession = mongoose.model('WorkoutSession', workoutSessionSchema);
const WorkoutTemplate = mongoose.model('WorkoutTemplate', workoutTemplateSchema);

module.exports = {
  Exercise,
  WorkoutPlan,
  WorkoutSession,
  WorkoutTemplate
}; 