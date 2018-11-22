const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
//const Reviews   = require('./models/Reviews')

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  posts: [{userReview: String}]

});

const User = mongoose.model("User", userSchema);

module.exports = User;