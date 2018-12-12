const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.js');

const router = express.Router();

router.get('/', (req, res, next) => {
	if(req.currentUser)
		User
			.findById(req.currentUser)
			.exec()
			.then(user => res.status(200).json(user))
			.catch(err => next(err));
	else{
		const err = new Error('no user logged');
		err.status = 401;
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
			.catch(err => {
				if (err.message.endsWith('is required.'))
					err.status = 400;
				next(err);
			});
	else {
		const err = new Error('password is required');
		err.status = 400;
		next(err);
	}
});

module.exports = router;