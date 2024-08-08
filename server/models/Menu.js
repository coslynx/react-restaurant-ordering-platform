const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categories: [
    {
      name: {
        type: String,
        required: true,
      },
      dishes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Dish',
          required: true,
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Menu', menuSchema);