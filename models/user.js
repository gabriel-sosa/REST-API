//load the mongoose module
const mongoose = require('mongoose');

//create the user schema
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
			//check that the email is not already in use
			{
		    	validator: value => {
		        	return User
		        		.findOne({emailAddress: value})
		        		.exec()
		        		.then(data => !data);
		    	},
		      	message: 'user already exists'
		    },
		    //check that the email is valid
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

//create the user model
const User = mongoose.model('user', Schema);

//return the user model
module.exports = User;