const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    default: '',
    required: [true, 'Shop must have a name'],
  },
  location: {
    type: String,
    trim: true,
  },
  telephoneNumber: {
    type: String,
  },
  appointmentOnly: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
  },
  barbers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Barber',
    },
  ],
  established: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Shop = mongoose.model('Shop', shopSchema, 'Shops');

module.exports = Shop;