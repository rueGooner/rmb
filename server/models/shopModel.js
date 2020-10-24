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
});

const Shop = mongoose.model('Shop', shopSchema, 'Shops');

module.exports = Shop;