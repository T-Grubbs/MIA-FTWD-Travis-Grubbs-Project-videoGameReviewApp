const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const bcrypt     = require('bcryptjs');
const bcryptSalt = 10;



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

    // newUser.save((err) => {
    //   if (err) {
    //     res.render("signup", { message: "Something went wrong" });
    //   } else {
    //     req.login(newUser, (err)=>{
    //       if (err){
    //         next(err);
    //       } else {
    //         console.log(req.user + '============d==a=v=vff=')
    //         res.redirect("/test");
      
    //       }
    //     })
    //   }
    // });

newUser.save()
.then(()=>{
  console.log(newUser + 'aslkdfakdjfasdfasf=========sdafa==sd')
  req.login(newUser, (err)=>{
    if(err){
      next(err);
    } else {
      res.redirect("/test")
    }
  })
})
.catch((err)=>{
  next(err)
})








  })
  .catch(err => {
    next(err)
  })
});




















module.exports = router;
