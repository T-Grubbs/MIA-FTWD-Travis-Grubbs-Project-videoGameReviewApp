const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const bcrypt     = require('bcryptjs');
const bcryptSalt = 10;


const ensureLogin = require("connect-ensure-login")
const passport = require("passport");

// router.get('/login', (req, res, next) => {
//   res.render('login');
// });





// router.post("/login", (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;
  
  
//   if (username === "" || password === "") {
//     res.render("login", {errorMessage: "Indicate a username and a password to sign up"});
//     return;
//   }
  
//   User.findOne({username: username })
//   .then(user => {
//       if (!user) {
//         res.render("login", {errorMessage: "Sorry, that username doesn't exist"});
//         return;
//       }
  
  
  
//       if (bcrypt.compareSync(password, user.password)) {
//         // Save the login in the session!
//         req.session.currentUser = user;
  
  
  
//         res.redirect("/");
//       } else {
//         res.render("auth/login", {
//           errorMessage: "Incorrect password"
//         });
//       }
  
//   })
//   .catch(error => {
//     next(error)
//   })
//   });
  
  
  
//   router.get("/logout", (req, res, next) => {
  
//   req.session.destroy((err) => {
  
//     res.redirect("/login");
//   });
  
//   });
  
router.get("/login", (req, res, next) => {
  res.render("login", {message: req.flash('error', "nooooo!")});
});




router.post("/login", passport.authenticate("local", {
  successRedirect: "/test",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});






router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("test", { user: req.user });
});





module.exports = router;
