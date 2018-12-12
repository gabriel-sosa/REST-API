const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'user'
	},
	title: {
		type: String, 
		required: true
	},
	description: {
		type: String, 
		required: true
	},
	estimatedTime: String,
	materialsNeeded: String
});

Schema.pre('updateOne', function(next) {
  this.options.runValidators = true;
  next();
});

const Course = mongoose.model('course', Schema);

module.exports = Course;