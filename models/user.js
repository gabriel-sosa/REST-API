const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	firstName: {
		type: String, 
		required: true
	},
	lastName: {
		type: String, 
		required: true
	},
	emailAddress: {
		type: String,
		validate: [
			{
		    	validator: value => {
		        	return User
		        		.findOne({emailAddress: value})
		        		.exec()
		        		.then(data => !data);
		    	},
		      	message: 'user already exists'
		    },
		    {
		    	validator: value => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
		      	message: 'invalid email'
		    }
	    ],
		required: true
	},
	password: {
		type: String, 
		required: true
	}
});

const User = mongoose.model('user', Schema);

module.exports = User;