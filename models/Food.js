const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    required: true,
  },
  measurement_description: {
    type: String,
    required: true,
  },
  number_of_units: {
    type: Number,
    required: true,
  },
  carbohydrate: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  fat: {
    type: Number,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

module.exports = Food = mongoose.model('food', ProfileSchema);
