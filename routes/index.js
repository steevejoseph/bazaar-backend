var express = require('express');
var passport = require('passport');
var User = require('../models/user.js');
var router = express.Router();
var request = require('request');
var urljoin = require("url-join");
var baseUrl = 'http://localhost:' + process.env.PORT;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/signup", function(req, res){
	res.render("signup.ejs");
});


// Authenticated signup logic.
router.post("/signup", function(req, res){

		var user;
		
		request({
	    url: urljoin(baseUrl, '/api/users/signup'),
	    method:'POST',
	    json:{
	        email:req.body.email,
	        password:req.body.password
	    },
	}, function(error, response, body){
			if(error){
				console.log(error);
			  // req.flash("failure", err.message);
			  return res.redirect("/signup");
			}
	    console.log(body);
	    // console.log
	    if(response && response.statusCode == 201){
				user = body.createdUser;
				req.session.user = user;
				req.user = user;
				res.locals.currentUser = user;
				req.flash("success", "Successfully created account.");
		  // changed rendering of login page to just go ahead and log-in
		  // after signup.
			  return res.redirect('/login/');
	    }
	    
	    res.redirect('/signup');
	});

	
	
	
	// // console.log(req.body);
	// User.register(new User({username:req.body.username}), req.body.password, function(err, user){
	// 	if(err){
	// 		console.log(err);
	// 		req.flash("failure", err.message);
	// 		return res.redirect("/signup");
	// 	}
		
	// 	// Does multiple things:
	// 	// 1. Logs user in.
	// 	// 2. Takes care of all session info
	// 	// 3. Stores correct info
	// 	// 4. Runs serializeUser()
	// 	// 5. Uses specified stratefy (local)
	// 	// "local" can be changed to multiple different strats.
	// 	passport.authenticate("local")(req, res, function(){
	// 	req.flash("success", "Successfully created account.");
	// 	// changed rendering of login page to just go ahead and log-in
	// 	// after signup.
	// 	res.redirect('/users/' + user._id);
	// 	});
	// });
});


router.get("/login", function(req, res){
	res.render('login.ejs'); 
});

// Perform authentication on login
router.post("/login", function(req, res){
	// passport.authenticate('local', function(err, user, info) {
 //   if (err) { 
 //   	console.log(err);
	// 		req.flash("failure", err.message);
 //   	return res.redirect('/login');
    	
 //   } if (!user) { 
 //   	console.log('Incorrect username or password');
 //   	req.flash('failure', info.message);
 //   	return res.redirect('/login'); 
 //   }
    
 //   req.logIn(user, function(err) {
 //     if (err) { 
 //     	console.log(err);
 //     }
    
 //     req.flash("success", "Successfully logged in.");
 //     res.redirect('/users/' + user._id);
 //   });
 // })(req, res);
 
 
 		var user;
		
		request({
	    url: urljoin(baseUrl, '/api/users/login'),
	    method:'POST',
	    json:{
	        email:req.body.email,
	        password:req.body.password
	    },
	}, function(error, response, body){
			if(error){
				console.log(error);
			  // req.flash("failure", err.message);
			  return res.redirect("/login");
			}
	    console.log(body);
	    // console.log
	    if(response && response.statusCode == 200){
				req.flash("success", "Successfully logged in.");
		  // changed rendering of login page to just go ahead and log-in
		  // after signup.
			  // res.redirect('/users/' + user._id);
			  res.redirect('/home');
	    }
	});
});


router.get("/home", function(req, res) {
    res.render('dashboard.ejs');
});

//logout route!
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully logged out.");
	res.redirect("/");
});

module.exports = router;
