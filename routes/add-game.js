const express    = require('express');
const router     = express.Router();
const Game       = require('../models/Games');




router.get("/add-game", (req, res, next) => {
  res.render("add-game");
});

router.post("/add-game", (req, res, next) => {

  const title = req.body.title;
  const platforms  = req.body.platforms;
  const genre  = req.body.genre;
  const multiplayer  = req.body.multiplayer;
  const online = req.body.online;

  // if (username === "" || password === "") {
  //   res.render("signup", { message: "Indicate username and password" });
  //   return;
  // }

  Game.findOne({ title })
  .then(game => {
    if (game !== null) {
      res.render("add-game", { message: "The game already exists" });
      return;
    }

    // const salt = bcrypt.genSaltSync(bcryptSalt);
    // const hashPass = bcrypt.hashSync(password, salt);

    const newGame = new Game({
      title: title,
      platforms: platforms,
      genre: genre,
      multiplayer: multiplayer,
      online: online,
    });

    newGame.save((err) => {
      if (err) {
        res.render("add-game", { message: "Something went wrong" });
      } else {
        res.redirect("/test");
      }
    });
  })
  .catch(err => {
    next(err)
  })
});



























// router.get("/add-game", (req, res, next) => {

//   Game.find()

//     .then((allGames)=>{

//       res.render("add-game", {games: allGames});

//     })

//   .catch((err)=>{
//     next(err)

//   })
// });


// router.post("/add-game", (req, res, next) => {

//   Game.create({

//      title:               req.body.title,
//      platforms:           req.body.platforms,
//      genre:               req.body.genre,
//      isMultiplayer:       req.body.multiplayer,
//      isOnline:            req.body.online

//     })
//     .then(()=>{
//       res.redirect('/games')
//     })
//     .catch((err)=>{
//       next(err)
//     })
//   });





















  //   router.get('/add-game', (req, res, next)=>{
  //     res.render('add-game');
  // })



//   if (title === "") {
//     res.render("add-game", { message: "Please include game title" });
//     return;
//   }




// Game.findOne({ title })
// .then(user => {
//   if (user !== null) {
//     res.render("add-game", { message: "This game has already been added" });
//     return;
//   }

  

//   const newGame = new Game({
//   title:       title,
//   platforms:   platforms,
//   genre:       genre,
//   multiplayer: isMultiplayer,
//   online:      isOnline,
//   //reviews: [{userReviews: [Reviews]}]
//   });

//   newGame.save((err) => {
//     if (err) {
//       res.render("add-game", { message: "Something went wrong" });
//     } else {
//       res.redirect("/games");
//     }
//   });
// })
// .catch(err => {
//   next(err)
// });


module.exports = router;