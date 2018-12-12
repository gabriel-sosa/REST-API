// load modules
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');

// load user model
const User = require('../models/user.js');

//function that verifies user credententials and stores the result in request object
module.exports = (req, res, next) => {
  const authUser = auth(req);
  if (authUser)
    User
      .findOne({emailAddress: authUser.name})
      .exec()
      .then(dbUser => {
        if (dbUser) 
          bcrypt
            .compare(authUser.pass, dbUser.password)
            .then(userFound =>{
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