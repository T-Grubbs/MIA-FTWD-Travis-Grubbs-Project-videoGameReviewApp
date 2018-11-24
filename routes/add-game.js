const express    = require('express');
const router     = express.Router();
const Game       = require('../models/Games');


router.get("/add-game", (req, res, next) => {
  
  res.render("add-game");
});


router.post("/add-game", (req, res, next) => {

  const title           = req.body.title;
  const platforms       = req.body.platforms;
  const genre           = req.body.genre;
  const isMultiplayer   = req.body.multiplayer;
  const isOnline        = req.body.online;



  if (title === "") {
    res.render("add-game", { message: "Please include game title" });
    return;
  }




Game.findOne({ title })
.then(user => {
  if (user !== null) {
    res.render("add-game", { message: "This game has already been added" });
    return;
  }

  

  const newGame = new Game({
  title:       title,
  platforms:   platforms,
  genre:       genre,
  multiplayer: isMultiplayer,
  online:      isOnline,
  //reviews: [{userReviews: [Reviews]}]
  });

  newGame.save((err) => {
    if (err) {
      res.render("add-game", { message: "Something went wrong" });
    } else {
      res.redirect("/games");
    }
  });
})
.catch(err => {
  next(err)
});
});


module.exports = router;