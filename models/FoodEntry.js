const mongoose = require('mongoose');

const FoodEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    required: true,
  },
  food: {
    breakfast: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'food',
          required: true,
        },
      },
    ],
    lunch: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'food',
          required: true,
        },
      },
    ],
    dinner: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'food',
          required: true,
        },
      },
    ],
    snack1: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'food',
          required: true,
        },
      },
    ],
    snack2: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'food',
          required: true,
        },
      },
    ],
    snack3: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'food',
          required: true,
        },
      },
    ],
  },
});

module.exports = FoodEntry = mongoose.model('foodEntry', FoodEntrySchema);
