const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Game = require('../models/Games');
const Review = require('../models/Reviews');

router.get('/:_id/new-review', (req, res, next) => {
	Game.findById(req.params._id)
		.then((theGame) => {
			console.log(theGame);
			res.render('reviews', { theGame });
		})
		.catch((err) => {
			next(err);
		});
});

router.post('/:_id/new-review', (req, res, next) => {
	const rating = req.body.rating;
	const comment = req.body.comment;

	const newReview = new Review({
		user: req.user._id,
		rating: rating,
		comment: comment
	});
	newReview
		.save()
		.then((review) => {
			Game.findByIdAndUpdate(req.params._id, { $push: { reviews: review._id } })
				.then((game) => {
					res.redirect('/game-details/' + req.params._id);
				})
				.catch(() => {
					next(err);
				});
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
