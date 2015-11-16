var express      = require('express');
var app          = express();
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var ejsLayouts   = require("express-ejs-layouts");
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

mongoose.connect('mongodb://localhost/passport-local-authentication');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set("views","./views");
app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

// this middleware will allow us to use the current user in the layout
app.use(function (req, res, next) {
  global.user = req.user;
  next();
});

function authenticatedUser(req, res, next) {
  // if the user is authenticated, then we continue the execution
  if (req.isAuthenticated()){
    return next();
  }

  // otherwise the request is always redirected to the home page
  res.redirect('/');
}

// our routes
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
});

app.post('/login', passport.authenticate('local-login', {
  successRedirect : '/profile',
  failureRedirect : '/login',
  failureFlash : true
}));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});

app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

app.get('/profile', authenticatedUser, function(req, res) {
  res.render('profile.ejs', {
    user : req.user
  });
});

app.listen(3000);
