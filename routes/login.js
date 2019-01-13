const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

const ensureLogin = require('connect-ensure-login');
const passport = require('passport');

router.get('/login', (req, res, next) => {
	res.render('login', { message: req.flash('error', 'nooooo!') });
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/test',
		failureRedirect: '/login',
		failureFlash: true,
		passReqToCallback: true
	})
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
	res.render('test', { user: req.user });
});

module.exports = router;
