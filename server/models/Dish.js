const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  dietaryInfo: {
    type: [String],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Dish', dishSchema);