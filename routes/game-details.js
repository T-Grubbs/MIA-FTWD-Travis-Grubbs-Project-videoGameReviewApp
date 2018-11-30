const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const Game       = require('../models/Games');


router.get("/game-details", (req, res, next) => {
  res.render("game-details");
});

router.get('/game-details/:id', (req, res, next)=>{
  Game.findById(req.params.id).populate({path: 'reviews', populate : {path: 'user'}})
  .then((theGame)=>{
      res.render('game-details', theGame)

  })
  .catch((err)=>{
      next(err);
  })
})












module.exports = router;