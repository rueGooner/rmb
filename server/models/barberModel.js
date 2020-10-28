const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    default: '',
    required: [true, 'Barber must have a name'],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Barber = mongoose.model('Barber', barberSchema, 'Barbers');

module.exports = Barber;