// load modules
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');

// load user model
const User = require('../models/user.js');

//function that verifies user credententials and stores the result in request object
module.exports = (req, res, next) => {
  const authUser = auth(req);
  //check that there is an user to authenticate
  if (authUser)
    //then search for the email in the database
    User
      .findOne({emailAddress: authUser.name})
      .exec()
      .then(dbUser => {
        //check that the email was found
        if (dbUser) 
          //compare the password
          bcrypt
            .compare(authUser.pass, dbUser.password)
            .then(userFound =>{
              //finally if the passwords match store the the user id in the request object as the current user
              if (userFound)
                req.currentUser = dbUser._id
            })
            .then(() => next());
        else
          next();
      })
      .catch(err => next(err));
  else
    next();
}