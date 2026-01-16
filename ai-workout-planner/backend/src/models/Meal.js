const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ingredient name is required'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Ingredient amount is required'],
    min: [0, 'Amount must be positive']
  },
  unit: {
    type: String,
    required: [true, 'Ingredient unit is required'],
    enum: ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'piece', 'slice', 'oz', 'lb']
  },
  calories_per_unit: {
    type: Number,
    min: [0, 'Calories must be positive']
  }
});

const nutritionSchema = new mongoose.Schema({
  calories: {
    type: Number,
    required: [true, 'Calories information is required'],
    min: [0, 'Calories must be positive']
  },
  protein: {
    type: Number,
    required: [true, 'Protein information is required'],
    min: [0, 'Protein must be positive']
  },
  carbs: {
    type: Number,
    required: [true, 'Carbs information is required'],
    min: [0, 'Carbs must be positive']
  },
  fat: {
    type: Number,
    required: [true, 'Fat information is required'],
    min: [0, 'Fat must be positive']
  },
  fiber: {
    type: Number,
    min: [0, 'Fiber must be positive'],
    default: 0
  },
  sugar: {
    type: Number,
    min: [0, 'Sugar must be positive'],
    default: 0
  },
  sodium: {
    type: Number,
    min: [0, 'Sodium must be positive'],
    default: 0
  }
});

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Meal name is required'],
    trim: true,
    maxlength: [100, 'Meal name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Meal category is required'],
    enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'beverage']
  },
  cuisine: {
    type: String,
    enum: ['american', 'italian', 'chinese', 'indian', 'mexican', 'japanese', 'french', 'thai', 'greek', 'middle_eastern', 'other']
  },
  ingredients: [ingredientSchema],
  instructions: [{
    step: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: [true, 'Instruction description is required'],
      maxlength: [300, 'Instruction cannot exceed 300 characters']
    }
  }],
  nutrition: {
    type: nutritionSchema,
    required: [true, 'Nutrition information is required']
  },
  servings: {
    type: Number,
    required: [true, 'Number of servings is required'],
    min: [1, 'Servings must be at least 1']
  },
  prep_time: {
    type: Number, // in minutes
    min: [0, 'Prep time cannot be negative']
  },
  cook_time: {
    type: Number, // in minutes
    min: [0, 'Cook time cannot be negative']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  dietary_tags: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free', 'low_carb', 'keto', 'paleo', 'high_protein', 'low_sodium']
  }],
  allergens: [{
    type: String,
    enum: ['dairy', 'eggs', 'fish', 'shellfish', 'tree_nuts', 'peanuts', 'wheat', 'soy']
  }],
  images: [{
    url: String,
    alt: String,
    is_primary: {
      type: Boolean,
      default: false
    }
  }],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  is_public: {
    type: Boolean,
    default: false
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      min: [0, 'Rating must be between 0 and 5'],
      max: [5, 'Rating must be between 0 and 5'],
      default: 0
    },
    count: {
      type: Number,
      default: 0,
      min: [0, 'Rating count cannot be negative']
    }
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  meal_plan_compatible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total time
mealSchema.virtual('total_time').get(function() {
  return (this.prep_time || 0) + (this.cook_time || 0);
});

// Virtual for calories per serving
mealSchema.virtual('calories_per_serving').get(function() {
  return Math.round(this.nutrition.calories / this.servings);
});

// Indexes for performance
mealSchema.index({ category: 1 });
mealSchema.index({ dietary_tags: 1 });
mealSchema.index({ created_by: 1 });
mealSchema.index({ is_public: 1 });
mealSchema.index({ 'rating.average': -1 });
mealSchema.index({ tags: 1 });
mealSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Pre-save middleware to calculate nutrition if not provided
mealSchema.pre('save', function(next) {
  if (this.isModified('ingredients') && !this.nutrition) {
    // Simple nutrition calculation based on ingredients
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    this.ingredients.forEach(ingredient => {
      if (ingredient.calories_per_unit) {
        totalCalories += ingredient.amount * ingredient.calories_per_unit;
      }
    });

    // Set basic nutrition if not provided
    this.nutrition = {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat
    };
  }
  next();
});

// Static method to find meals by dietary restrictions
mealSchema.statics.findByDietaryRestrictions = function(restrictions) {
  return this.find({
    dietary_tags: { $all: restrictions },
    is_public: true
  });
};

// Static method to find meals by ingredients
mealSchema.statics.findByIngredients = function(ingredientNames) {
  return this.find({
    'ingredients.name': { $in: ingredientNames },
    is_public: true
  });
};

// Instance method to check if meal fits dietary restrictions
mealSchema.methods.fitsDietaryRestrictions = function(restrictions) {
  return restrictions.every(restriction => 
    this.dietary_tags.includes(restriction)
  );
};

module.exports = mongoose.model('Meal', mealSchema);