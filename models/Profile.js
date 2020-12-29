const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  settings: {
    macros: {
      calories: {
        type: Number,
        default: 2000,
        required: true,
      },
      protein: {
        type: Number,
        default: 150,
        required: true,
      },
      fat: {
        type: Number,
        default: 150,
        required: true,
      },
      carbohydrates: {
        type: Number,
        default: 120,
        required: true,
      },
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
    },
    preferences: {
      metrics: {
        weight: {
          type: String,
          default: 'kg',
          required: true,
        },
      },
    },
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
