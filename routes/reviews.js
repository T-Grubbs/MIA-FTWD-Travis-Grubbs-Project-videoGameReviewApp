const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const Game       = require('../models/Games')

router.get("/:_id/new-review", (req, res, next) => {
  res.render("reviews");
});

router.post('/:_id/new-review', (req, res, next)=>{

const user = req.body.user;
const rating = req.body.rating;
const comment = req.body.comment;



Review.findOne({ user })
  .then(review => {
    
    const newReview = new Review({
      user: user,
      rating: rating,
      comment: comment,

    });


    newReview.save((err) => {
      if (err) {
        res.render("new-review");
      } else {
        res.redirect("/game-details");
      }
    });
  })
  .catch(err => {
    next(err)
  })
});


 
  



module.exports = router;
