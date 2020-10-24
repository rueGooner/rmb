const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    default: '',
    required: [true, 'Shop must have a name'],
  },
  teamImage: {
    type: String,
    default: '',
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Barber',
    },
  ],
});

const Shop = mongoose.model('Shop', shopSchema, 'Shops');

module.exports = Shop;