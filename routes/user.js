const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');

const router = express.Router();

router.get('/', (req, res, next) => {
	if(req.currentUser)
		User
			.findById(req.currentUser)
			.exec()
			.then(user => res.json(user))
			.catch(err => next(err));
	else{
		const err = new Error('no user logged');
		next(err);
	}
});

router.post('/', (req, res, next) => {
	if (req.body.password)
		bcrypt
			.hash(req.body.password, 10)
			.then(hash => 
				User
					.create({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						emailAddress: req.body.emailAddress,
						password: hash
					})
					.then(() => res.status(201).redirect('/'))
			)
			.catch(err => next(err));
	else {
		const err = new Error('password is required');
		next(err);
	}
});

module.exports = router;