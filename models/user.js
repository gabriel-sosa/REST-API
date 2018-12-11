const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	emailAddress: String,
	password: String
});

const User = mongoose.model('user', Schema);

module.exports = User;