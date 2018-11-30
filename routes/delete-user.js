const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');


router.post('/delete-user', (req, res, next)=>{
  User.findByIdAndRemove(req.user._id)
  .then(()=>{
      res.redirect('/')
  })
  .catch((err)=>{
      next(err);
  })
})



















module.exports = router;