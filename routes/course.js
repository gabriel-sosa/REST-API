const express = require('express');

const Course = require('../models/course.js');

const router = express.Router();

router.get('/', (req, res, next) => {
	Course
		.find()
		.populate('user')
		.exec()
		.then(courses => res.json(courses))
		.catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
	Course
		.findById(req.params.id)
		.populate('user')
		.exec()
		.then(course => res.json(course))
		.catch(err => next(err));
});

router.post('/', (req, res, next) => {
	if (req.currentUser)
		Course
			.create({
				user: req.currentUser,
				title: req.body.title,
				description: req.body.description,
				estimatedTime: req.body.estimatedTime,
				materialsNeeded: req.body.materialsNeeded
			})
			.then(() => res.status(201).redirect('/'))
			.catch(err => next(err));
	else {
		const err = new Error('no user logged');
		next(err);
	}
});

router.put('/:id', (req, res, next) => {
	if (req.currentUser)
		Course
			.where({_id: req.params.id, user: req.currentUser})
			.updateOne({
				title: req.body.title,
				description: req.body.description,
				estimatedTime: req.body.estimatedTime,
				materialsNeeded: req.body.materialsNeeded
			})
			.then(course => res.json(course))
			.catch(err => next(err));
	else {
		const err = new Error('no user logged');
		next(err);
	}
});

router.delete('/:id', (req, res, next) => {
	if (req.currentUser)
		Course
			.where({_id: req.params.id, user: req.currentUser})
			.deleteOne()
			.then(course => res.json(course))
			.catch(err => next(err));
	else {
		const err = new Error('no user logged');
		next(err);
	}
});

module.exports = router;