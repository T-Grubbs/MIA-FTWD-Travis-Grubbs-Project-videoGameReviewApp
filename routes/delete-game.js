const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Game = require('../models/Games');

router.post('/delete-game/:id', (req, res, next) => {
	Game.findByIdAndRemove(req.params.id)
		.then(() => {
			res.redirect('/games');
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
