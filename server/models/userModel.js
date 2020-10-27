import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    default: '',
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('User', userSchema, 'Users');