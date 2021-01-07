const mongoose = require('mongoose');

const FoodEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: String,
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
  skip: {
    skipBreakfast: {
      type: Boolean,
    },
    skipLunch: {
      type: Boolean,
    },
    skipDinner: {
      type: Boolean,
    },
    skipSnack1: {
      type: Boolean,
    },
    skipSnack2: {
      type: Boolean,
    },
    skipSnack3: {
      type: Boolean,
    },
  },
});

module.exports = FoodEntry = mongoose.model('foodEntry', FoodEntrySchema);
