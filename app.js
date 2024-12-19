var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var passport = require("passport");
var session = require('express-session');
// var User = require("./models/user");
// var	LocalStrategy = require("passport-local");
// var bodyParser = require('body-parser');
var cors = require("cors");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var servicesRouter = require('./routes/services');
const userAPI = require('./api/routes/usersapi');
var servicesAPI = require("./api/routes/servicesapi");
var photosAPI = require("./api/routes/photosapi");

var app = express();
const jwt = require('jsonwebtoken');

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// database connection
require("dotenv").config();
mongoose.connect(process.env.MONGO_DB_ATLAS_URL, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(cors());

app.use(session({
    // this secret will be used to 
    // encode (encrypt) and decode(decrypt) the sessions.
    secret:"I love you",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// passport.use(new LocalStrategy(User.authenticate()));

// Two more lines before we can start working on the routes
// Responsible for encoding data and putting it back into the session
// passport.serializeUser(User.serializeUser());
// // Responsible for reading the session, taking data from the session and unencoding it
// passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {

    // Sanity checking the current logged in user.
    // console.log("Start current user");
    // console.log(res.locals.currentUser);
    // console.log("End current user");

    // sanity checking "global" variables.
    // console.log(app.locals);
    
    res.locals.success = req.flash("success");
    res.locals.failure = req.flash("failure");
    next();
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/services', servicesRouter);
app.use('/api/users', userAPI);
app.use('/api/services', servicesAPI);
app.use('/api/photos', photosAPI);

app.use(express.static(path.join(__dirname, "frontend/build")));

// Anything that doesn't match the above, send back index.html
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
