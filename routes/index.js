var express = require('express');
var passport = require('passport');
var	bodyParser = require("body-parser");
var	LocalStrategy = require("passport-local");
var	passportLocalMongoose	= require("passport-local-mongoose");
var User = require('../models/user.js');
var session = require('express-session');
var router = express.Router();

var flash = require('connect-flash');

router.use(session({
    // this secret will be used to 
    // encode (encrypt) and decode(decrypt) the sessions.
    secret:"I love you",
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// Two more lines before we can start working on the routes
// Responsible for encoding data and putting it back into the session
passport.serializeUser(User.serializeUser());
// Responsible for reading the session, taking data from the session and unencoding it
passport.deserializeUser(User.deserializeUser());

//router.set("view engine", "ejs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get("/signup", function(req, res){
	res.render("signup.ejs");
});

// Authenticated signup logic.
router.post("/signup", function(req, res){

	// console.log(req.body);
	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("signup.ejs");
		}
		console.log("Success user");
		
		// Does multiple things:
		// 1. Logs user in.
		// 2. Takes care of all session info
		// 3. Stores correct info
		// 4. Runs serializeUser()
		// 5. Uses specified stratefy (local)
		// "local" can be changed to multiple different strats.
		passport.authenticate("local")(req, res, function(){
		// res.render('login.ejs');
		// changed rendering of login page to just go ahead and log-in
		// after signup.
		res.redirect('/users/' + user._id);
		});
	});
});



router.get("/login", function(req, res){
	res.render('login.ejs'); 
});

// Perform authentication on login
router.post("/login", isLoggedIn, function(req, res){
	passport.authenticate('local', {successFlash: 'Welcome!', failureFlash: 'Invalid username or password.' }, function(err, user, info) {
    if (err) { 
    	console.log(err);
    	return;
    	
    } if (!user) { 
    	console.log('Incorrect username or password');
    	//req.flash("error", "Incorrect username or password");
    	return res.render('login.ejs'); 
    }
    
    req.logIn(user, function(err) {
      if (err) { 
      	console.log(err);
      }
    
      //req.flash("success", "You are signed in!");
      res.redirect('/users/' + user._id);
    });
  })(req, res);
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	
	//flash messages that indicates a user must be logged in
	//req.flash("error", "Please log in first!" );
	
	res.redirect("/login");
};

//logout route!
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});


module.exports = router;
