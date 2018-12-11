const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/user.js');

router.get('/', (req, res) => {
	if(req.currentUser)
		User
			.findById(req.currentUser)
			.exec()
			.then(user => res.json(user))
			.catch(err => console.log(err));
	else
		res.send('no user logged');
});

router.post('/', (req, res) => {
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
				.then(() => res.send('user created'))
		)
		.catch(err => next(err));
});

module.exports = router;