var express = require('express');
var passport = require('passport');
var	bodyParser = require("body-parser");
var	LocalStrategy = require("passport-local");
var	passportLocalMongoose	= require("passport-local-mongoose");
var User = require('../models/user.js');
var router = express.Router();

router.use(require("express-session")({
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



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//router.set("view engine", "ejs");

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
		passport.authenticate("local")(req, res, function(){
		res.render('login.ejs');
		});
	});
});



router.get("/login", function(req, res){
	res.render('login.ejs'); 
});

// Perform authentication on login
router.post("/login", function(req, res){
	passport.authenticate('local', function(err, user, info) {
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


router.get("/:id", function(req, res) {
    res.render("dashboard.ejs");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	
	//flash messages that indicates a user must be logged in
	//req.flash("error", "Please log in first!" );
	
	res.redirect("/login");
};


module.exports = router;
