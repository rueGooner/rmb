const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    default: 1
  },
  review: {
    type: String,
    required: true
  }
});

const Review = mongoose.model("Review", ReviewSchema);

// Export model
module.exports = Review;