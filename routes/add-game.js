const express = require('express');
const router = express.Router();
const Game = require('../models/Games');

router.get('/add-game', (req, res, next) => {
	res.render('add-game');
});

router.post('/add-game', (req, res, next) => {
	const title = req.body.title;
	const platforms = req.body.platforms;
	const genre = req.body.genre;
	const multiplayer = req.body.multiplayer;
	const online = req.body.online;
	const image = req.body.image;
	const review = req.body.review;

	Game.findOne({ title })
		.then((game) => {
			if (game !== null) {
				res.render('add-game', { message: 'The game already exists' });
				return;
			}

			const newGame = new Game({
				title: title,
				platforms: platforms,
				genre: genre,
				multiplayer: multiplayer,
				online: online,
				image: image,
				review: review
			});

			newGame.save((err) => {
				if (err) {
					res.render('add-game', { message: 'Something went wrong' });
				} else {
					res.redirect('/games');
				}
			});
		})
		.catch((err) => {
			next(err);
		});
});


module.exports = router;
