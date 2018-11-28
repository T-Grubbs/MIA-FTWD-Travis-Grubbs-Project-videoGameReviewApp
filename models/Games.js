const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Reviews   = require('../models/Reviews')


const gameSchema = new Schema({
  title:       String,
  platforms:   String,
  genre:       String,
  multiplayer: String,
  online:      String,
  image:       String,
  reviews:    [{type: Schema.Types.ObjectId, ref: 'Reviews'}]

});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;