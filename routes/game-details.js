const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const Game       = require('../models/Games')

router.get("/game-details", (req, res, next) => {
  res.render("game-details");
});

router.get('/game-details/:id', (req, res, next)=>{
  Game.findById(req.params.id)
  .then((theGame)=>{
      res.render('game-details', theGame)
      // here we pass in theBook which is an object, and has keys like
      // title description and author
      //therefore the variables we will have available in this view are
      // title, description, author, etc. we will not have a variable called theBook b/c it is not a key inside theBook (bc that wouldnt make sense)
  })
  .catch((err)=>{
      next(err);
  })
})












module.exports = router;