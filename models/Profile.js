const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  gender: {
    type: String,
    default: 'male',
    required: true,
  },
  height: {
    type: Number,
    default: 180,
    required: true,
  },
  heightUnit: {
    type: String,
    default: 'cm',
    required: true,
  },
  weight: {
    type: Number,
    default: 75,
    required: true,
  },
  weightUnit: {
    type: String,
    default: 'kg',
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  activityLevel: {
    type: Number,
    required: true,
  },
  BMR: {
    type: Number,
  },
  goals: {
    steps: {
      type: Number,
      default: 10000,
      required: true,
    },
    water: {
      type: Number,
      default: 6,
      required: true,
    },
    weight: {
      type: String,
      default: 'maintain',
      required: true,
    },
  },
  dietPlan: {
    type: String,
    default: 'standard',
    required: true,
  },
  macroNutrients: {
    carbs: {
      type: Number,
      default: 50,
      required: true,
    },
    protrein: {
      type: Number,
      default: 25,
      required: true,
    },
    fat: {
      type: Number,
      default: 25,
      required: true,
    },
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
