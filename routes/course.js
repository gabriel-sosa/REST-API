// load the module
const express = require('express');

//load the course model
const Course = require('../models/course.js');

//create the express router
const router = express.Router();

// /api/courses GET route
router.get('/', (req, res, next) => {
	//find and send all courses, from user only the first name and last name is sent
	Course
		.find()
		.populate('user', 'firstName lastName')
		.exec()
		.then(courses => res.status(200).json(courses))
		.catch(err => next(err));
});

// /api/courses/courseId GET route
router.get('/:id', (req, res, next) => {
	//find and send the requested course
	Course
		.findById(req.params.id)
		.populate('user', 'firstName lastName')
		.exec()
		.then(course => res.status(200).json(course))
		.catch(err => next(err));
});

// api/courses POST route
router.post('/', (req, res, next) => {
	//checks that there is current user logged, else gives an error
	if (req.currentUser)
		//then creates the user with the logged user as the creator
		Course
			.create({
				user: req.currentUser,
				title: req.body.title,
				description: req.body.description,
				estimatedTime: req.body.estimatedTime,
				materialsNeeded: req.body.materialsNeeded
			})
			.then(() => res.status(201).location('/').send('course created'))
			.catch(err => {
				//check if the error comes from the data validation in the user model
				if (err.message.endsWith('is required.'))
					err.status = 400;
				next(err);
			});
	else {
		const err = new Error('no user logged');
		err.status = 401;
		next(err);
	}
});

// /api/courses/courseId PUT route
router.put('/:id', (req, res, next) => {
	//checks that there is current user logged, else gives an error
	if (req.currentUser)
		//then searches for a course to update with the requested courses id and the logged user as the creator
		Course
			.where({_id: req.params.id, user: req.currentUser})
			.updateOne({
				title: req.body.title,
				description: req.body.description,
				estimatedTime: req.body.estimatedTime,
				materialsNeeded: req.body.materialsNeeded
			})
			//if no course is updated then the course does not exist or the logged user is not the creator
			.orFail(new Error(`you don't own this course or the course was not found.`))
			.then(() => res.status(204).location('/').send('course updated'))
			.catch(err => {
				//check if the error comes from the .orFail query
				if (err.message.endsWith('not found.'))
					err.status = 403;
				next(err);
			});
	else {
		const err = new Error('no user logged');
		err.status = 401;
		next(err);
	}
});

// /api/courses/courseId DELETE route
router.delete('/:id', (req, res, next) => {
	//checks that there is current user logged, else gives an error
	if (req.currentUser)
		//then searches for a course to update with the requested courses id and the logged user as the creator
		Course
			.where({_id: req.params.id, user: req.currentUser})
			.deleteOne()
			//if no course is deleted then the course does not exist or the logged user is not the creator
			.orFail(new Error(`you don't own this course or the course was not found.`))
			.then(() => res.status(204).location('/').send('course deleted'))
			.catch(err => {
				//check if the error comes from the .orFail query
				if (err.message.endsWith('not found.'))
					err.status = 403;
				next(err);
			});
	else {
		const err = new Error('no user logged');
		err.status = 401;
		next(err);
	}
});

// return the router
module.exports = router;