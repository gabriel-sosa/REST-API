//load modules
const express = require('express');
const bcrypt = require('bcryptjs');

//load user model
const User = require('../models/user.js');

//create the express router
const router = express.Router();

// /api/users GET route
router.get('/', (req, res, next) => {
	//checks that there is current user logged, else gives an error
	if(req.currentUser)
		//find and send the current user data
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

// /api/users POST route
router.post('/', (req, res, next) => {
	//first checks that the user sent a password to hash, else gives an error
	if (req.body.password)
		//then we hash the password
		bcrypt
			.hash(req.body.password, 10)
			.then(hash => 
				//and then the user is saved in the database with the hash password
				User
					.create({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						emailAddress: req.body.emailAddress,
						password: hash
					})
					.then(() => res.status(201).location('/').send('user created'))
			)
			.catch(err => {
				//check if the error comes from the data validation in the user model
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

//return the express router
module.exports = router;