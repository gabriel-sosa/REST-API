const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
	title: String,
	description: String,
	estimatedTime: String,
	materialsNeeded: String
});

const Course = mongoose.model('course', Schema);

module.exports = Course;