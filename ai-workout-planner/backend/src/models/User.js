const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  avatar: {
    type: String,
    default: null
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profile: {
    age: {
      type: Number,
      min: [13, 'Age must be at least 13'],
      max: [120, 'Age cannot exceed 120']
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    height: {
      type: Number, // in cm
      min: [50, 'Height must be realistic'],
      max: [300, 'Height must be realistic']
    },
    weight: {
      type: Number, // in kg
      min: [20, 'Weight must be realistic'],
      max: [500, 'Weight must be realistic']
    },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'],
      default: 'moderately_active'
    },
    fitnessGoals: [{
      type: String,
      enum: ['weight_loss', 'weight_gain', 'muscle_gain', 'endurance', 'strength', 'general_fitness']
    }],
    dietaryRestrictions: [{
      type: String,
      enum: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free', 'low_carb', 'keto', 'paleo']
    }],
    medicalConditions: [{
      type: String
    }]
  },
  preferences: {
    units: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric'
    },
    language: {
      type: String,
      default: 'en'
    },
    timezone: {
      type: String,
      default: 'UTC'
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      workout_reminders: {
        type: Boolean,
        default: true
      },
      meal_reminders: {
        type: Boolean,
        default: true
      }
    }
  },
  subscription: {
    status: {
      type: String,
      enum: ['none', 'active', 'cancelled', 'past_due'],
      default: 'none'
    },
    plan: {
      type: String,
      enum: ['free', 'premium', 'pro'],
      default: 'free'
    },
    startedAt: {
      type: Date
    },
    expiresAt: {
      type: Date
    },
    renewedAt: {
      type: Date
    },
    source: {
      type: String,
      enum: ['stripe', 'manual', 'promo'],
      default: 'manual'
    },
    notes: {
      type: String,
      maxlength: 300
    }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for BMI calculation
userSchema.virtual('bmi').get(function() {
  if (this.profile.height && this.profile.weight) {
    const heightInM = this.profile.height / 100;
    return Math.round((this.profile.weight / (heightInM * heightInM)) * 10) / 10;
  }
  return null;
});

// Index for performance
userSchema.index({ createdAt: -1 });

// Derived helpers
userSchema.virtual('isPremium').get(function() {
  if (!this.subscription) return false;
  const isActive = this.subscription.status === 'active';
  if (!isActive) return false;
  if (!this.subscription.expiresAt) return true;
  return this.subscription.expiresAt > new Date();
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update lastLogin when user logs in
userSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('lastLogin')) {
    this.lastLogin = Date.now();
  }
  next();
});

// Instance method to check password
userSchema.methods.checkPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Alias for checkPassword (used by authController)
userSchema.methods.comparePassword = userSchema.methods.checkPassword;

// Instance method to generate JWT
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );
};

// Instance method to generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  const resetToken = require('crypto').randomBytes(20).toString('hex');
  
  this.passwordResetToken = require('crypto')
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  return resetToken;
};

// Instance method to get public profile (without sensitive data)
userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    role: this.role,
    subscription: this.subscription,
    profile: this.profile,
    preferences: this.preferences,
    isEmailVerified: this.isEmailVerified,
    lastLogin: this.lastLogin,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', userSchema);