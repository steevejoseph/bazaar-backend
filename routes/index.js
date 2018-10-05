var express = require('express');
var passport = require('passport');
var User = require('../models/user.js');
var router = express.Router();
var request = require('request');
var urljoin = require("url-join");
var baseUrl = 'http://localhost:' + process.env.PORT;
var nodemailer = require('nodemailer');

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
		  
		  // Sends a welcome email after user signs up
		nodemailer.createTestAccount((err, account) => {
			
			if(err){
			  console.log(err);
			}
			
			let transporter = nodemailer.createTransport({
				
				//host: 'smtp.ethereal.email',
				//port: 587,
				//secure: false,
				service: 'gmail',
				auth: {
					user: 'largo.brawns@gmail.com',
					pass: 'br@aaWNSS7'
				}
			});
			
			
			let mailOptions = {
				from: '"Your fav app" <largo.brawns@gmail.com>',
				to: req.body.email,
				subject: 'Welcome!',
				html: '<p>Hi there!</p> <p>Thanks for signing up :)</p>'
				
			};
			
			
			transporter.sendMail(mailOptions, (err, info) => {
				
				if(err) {
				  console.log(err);
				}
				
				console.log('Message send: %s', info.messageId);
			//	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
				
			});
		
		});

		  return res.redirect('/login/');
	    }
	    
	    res.redirect('/signup');
	});
});


router.get("/login", function(req, res){
	res.render('login.ejs'); 
});

// Perform authentication on login
router.post("/login", function(req, res){

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
