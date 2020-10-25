const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    default: '',
    required: [true, 'Barber must have a name'],
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  },
});

const Barber = mongoose.model('Barber', barberSchema, 'Barbers');

module.exports = Barber;