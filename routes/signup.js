const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const bcrypt     = require('bcryptjs');
const bcryptSalt = 10;


// const ensureLogin = require("connect-ensure-login")
// const passport = require("passport");


//creates Signup page
// router.get('/signup', (req, res, next) => {
//   res.render('signup');
// });

// router.post('/signup', (req, res, next)=>{


//   const theUserName = req.body.theUserName;
//   const thePassWord = req.body.thePassWord;

//   if (theUserName === "" || thePassWord === "") {
//       res.render("signup", {errorMessage: "Indicate a username and a password to sign up"});
//       return;
//     }

//     User.findOne({username: theUserName })
//     .then(user => {
//             if (user !== null) {
//                 res.render("signup", {
//                     errorMessage: "Sorry, that username is awesome so obviously it's taken!"
//                 });
//                 return;
//                 }
    


//         const salt     = bcrypt.genSaltSync(bcryptSalt);
//         const hashPass = bcrypt.hashSync(thePassWord, salt);


//         User.create({username: theUserName, password: hashPass})
//         .then(()=>{
//             res.redirect('/');
//         })
//         .catch((err)=>{
//             next(err);
// })


// });// end .then for User.findOne
// });


router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {

  const firstname = req.body.firstname;
  const lastname  = req.body.lastname;
  const username  = req.body.username;
  const password  = req.body.password;

  if (username === "" || password === "") {
    res.render("signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
  .then(user => {
    if (user !== null) {
      res.render("signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
      firstname: firstname,
      lastname: lastname,
    });

    newUser.save((err) => {
      if (err) {
        res.render("signup", { message: "Something went wrong" });
      } else {
        res.redirect("/test");
      }
    });
  })
  .catch(err => {
    next(err)
  })
});




















module.exports = router;