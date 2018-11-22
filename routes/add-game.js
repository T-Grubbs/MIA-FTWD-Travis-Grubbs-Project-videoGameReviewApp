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



  if (username === "" || password === "") {
    res.render("signup", { message: "Indicate username and password" });
    return;
  }




Game.findOne({ theTitle })
.then(user => {
  if (user !== null) {
    res.render("add-game", { message: "The username already exists" });
    return;
  }

  

  const newGame = new Game({
    title: title,
  platforms: platforms,
  genre: genre,
  multiplayer: isMultiplayer,
  online: isOnline,
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