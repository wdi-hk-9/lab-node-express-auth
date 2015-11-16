var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  // here we declare all the logic for the strategies , we will have 2 strategies , one for sign in , another one for sign up
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, callback) {
    process.nextTick(function() {
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) return callback(err);

        if (user) { // if this email is already saved , we return the response with an info message
          return callback(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          var newUser            = new User();
          newUser.local.email    = email;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function(err) {
            if (err) throw err;
            return callback(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, callback) { // callback with email and password from our form
    // we search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);

      if (!user){ // if no user is found
        return callback(null, false, req.flash('loginMessage', 'No user found.'));
      }

      if (!user.validPassword(password)){ // user with wrong password
        return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user);
    });
  }));
};
