const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	emailAddress: {type: String, required: true},
	password: {type: String, required: true}
});

const User = mongoose.model('user', Schema);

module.exports = User;