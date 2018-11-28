const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');
const Game       = require('../models/Games')

// router.get('/:id/delete-game', (req, res, next)=>{
//   res.render('/delete-game');
// })


router.post('/delete-game/:id', (req, res, next)=>{
  Game.findByIdAndRemove(req.params.id)
  .then(()=>{
      res.redirect('/games')
  })
  .catch((err)=>{
      next(err);
  })
})



module.exports = router;