const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const Game       = require('../models/Games');



router.get("/games", (req, res, next) => {
  res.render("games");
});






module.exports = router;