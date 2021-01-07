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
        amount: {
          type: Number,
          required: true,
          default: 1,
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
        amount: {
          type: Number,
          required: true,
          default: 1,
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
        amount: {
          type: Number,
          required: true,
          default: 1,
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
        amount: {
          type: Number,
          required: true,
          default: 1,
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
        amount: {
          type: Number,
          required: true,
          default: 1,
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
        amount: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  skip: {
    skipBreakfast: {
      type: Boolean,
      required: true,
      default: false,
    },
    skipLunch: {
      type: Boolean,
      required: true,
      default: false,
    },
    skipDinner: {
      type: Boolean,
      required: true,
      default: false,
    },
    skipSnack1: {
      type: Boolean,
      required: true,
      default: false,
    },
    skipSnack2: {
      type: Boolean,
      required: true,
      default: false,
    },
    skipSnack3: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
});

module.exports = FoodEntry = mongoose.model('foodEntry', FoodEntrySchema);
