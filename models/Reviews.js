const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
//const User     = require('./models/User')


const reviewSchema = new Schema({
  user:    [{type: Schema.Types.ObjectId, ref: 'User'}],
  rating:  Number,
  comment: String
});



const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;