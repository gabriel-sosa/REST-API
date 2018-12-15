'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//load routes
const courseRoute = require('./routes/course.js');
const userRoute = require('./routes/user.js');

//load auth
const authenticateUser = require('./auth/user.js');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));


//establish connection with the database
mongoose.connect('mongodb://localhost:27017/fsjstd-restapi')
  .then(() => console.log('database online'))
  .catch(err => console.log(err));

// TODO setup your api routes here

//parse the request body
app.use(bodyParser.json());

//verify the user credentials
app.use(authenticateUser);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

//setup the course routes
app.use('/api/courses', courseRoute);

//setup the user routes
app.use('/api/users', userRoute);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
