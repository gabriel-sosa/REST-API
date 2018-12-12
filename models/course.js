//load the mongoose module
const mongoose = require('mongoose');

//create the course schema
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

//set the shemo so that updates are also validated
Schema.pre('updateOne', function(next) {
  this.options.runValidators = true;
  next();
});

//create the course model
const Course = mongoose.model('course', Schema);

//return the course model
module.exports = Course;