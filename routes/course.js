const express = require('express');

const router = express.Router();

const Course = require('../models/course.js');

router.get('/', (req, res) => {
	Course
		.find()
		.populate('user')
		.exec()
		.then(courses => res.json(courses))
		.catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
	res.json({
		message: `welcome to the couse ${req.params.id} GET route`
	});
});

router.post('/', (req, res) => {
	res.json({message: 'hello'});
});

router.put('/:id', (req, res) => {
	res.json({
		message: `welcome to the couse ${req.params.id} PUT route`
	});
});

router.delete('/:id', (req, res) => {
	res.json({
		message: `welcome to the couse ${req.params.id} DELETE route`
	});
});

module.exports = router;