var express = require('express');
var passport = require('passport');
var User = require('../models/user.js');
var router = express.Router();
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

	// console.log(req.body);
	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("failure", err.message);
			return res.redirect("/signup");
		}
		
		// Does multiple things:
		// 1. Logs user in.
		// 2. Takes care of all session info
		// 3. Stores correct info
		// 4. Runs serializeUser()
		// 5. Uses specified stratefy (local)
		// "local" can be changed to multiple different strats.
		passport.authenticate("local")(req, res, function(){
		req.flash("success", "Successfully created account.");
		// changed rendering of login page to just go ahead and log-in
		// after signup.
		
		
		
		// Sends a welcome email after user signs up
		nodemailer.createTestAccount((err, account) => {
			
			if(err){
				return console.log(err);
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
					return console.log(err);
				}
				
				console.log('Message send: %s', info.messageId);
			//	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
				
			});
		
		});
		
		
		res.redirect('/users/' + user._id);
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
			req.flash("failure", err.message);
    	return res.redirect('/login');
    	
    } if (!user) { 
    	console.log('Incorrect username or password');
    	req.flash('failure', info.message);
    	return res.redirect('/login'); 
    }
    
    req.logIn(user, function(err) {
      if (err) { 
      	console.log(err);
      }
    
      req.flash("success", "Successfully logged in.");
      res.redirect('/users/' + user._id);
    });
  })(req, res);
});

//logout route!
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Successfully logged out.");
	res.redirect("/");
});

module.exports = router;
