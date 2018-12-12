const express = require('express');

const Course = require('../models/course.js');

const router = express.Router();

router.get('/', (req, res, next) => {
	Course
		.find()
		.populate('user', 'firstName lastName')
		.exec()
		.then(courses => res.status(200).json(courses))
		.catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
	Course
		.findById(req.params.id)
		.populate('user', 'firstName lastName')
		.exec()
		.then(course => res.status(200).json(course))
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
			.catch(err => {
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
			.orFail(new Error(`you don't own this course or the course was not found.`))
			.then(() => res.status(204).redirect('/'))
			.catch(err => {
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

router.delete('/:id', (req, res, next) => {
	if (req.currentUser)
		Course
			.where({_id: req.params.id, user: req.currentUser})
			.deleteOne()
			.orFail(new Error(`you don't own this course or the course was not found.`))
			.then(() => res.status(204).redirect('/'))
			.catch(err => {
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

module.exports = router;