const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');



router.get("/games", (req, res, next) => {
  res.render("games");
});






module.exports = router;