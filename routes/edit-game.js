const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Game = require('../models/Games');

router.get('/edit-game/:id', (req, res, next) => {
	Game.findById(req.params.id)
		.then((theGame) => {
			res.render('edit-game', { theGame });
		})
		.catch((err) => {
			next(err);
		});
});

router.post('/update/:id', (req, res, next) => {
	Game.findByIdAndUpdate(req.params.id, req.body)
		.then(() => {
			res.redirect('/game-details/' + req.params.id);
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
