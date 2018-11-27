const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const Game       = require('../models/Games')


router.get("/games", (req, res, next) => {
  if(!req.user){
    req.flash('error', 'page not available');
    res.redirect('/login')
    return;
} else{

    Game.find()
    .then((allTheGames)=>{
        res.render('games', {games: allTheGames})
    })
    .catch((err)=>{
        next(err);
    })
}





  //res.render("games");
});






module.exports = router;