var express = require('express');

var middleware = require('../middleware/index.js'),
    Service = require('../models/service.js'),
    mongoose = require('mongoose'),
    request = require('request'),
    urljoin = require('url-join'),
    baseUrl = 'http://localhost:' + process.env.PORT,

    router  = express.Router();
    
    
router.get('/', function(req, res){
    Service.find({}, function(err, services){
        if(err){
            console.log(err);
            req.flash("failure", err.message);
            return res.redirect('/users/' + req.user._id);
        }
        
        res.render('services/index.ejs', {services:services});
        
    });
});

router.get('/new', function(req, res){
    res.render('services/new.ejs');
});

router.post('/new', function(req, res){
    Service.create({
    name:req.body.name,
    owner:req.user,
    description:req.body.description,
    }, function(err, service){
        if(err){
            console.log(err);
            req.flash("failure", err.message);
        }
        
        else{
            req.flash("success", "Service added!");
            res.redirect('/services');
        }
    });
});

router.get('/search', function(req, res) {
    res.render('services/search.ejs');
});

router.post('/search', function(req, res) {
        var user;
		
		request({
	    url: urljoin(baseUrl, '/api/services/search'),
	    method:'POST',
	    json:{
	        query:req.body.query,
	    },
	}, function(error, response, body){
			if(error){
				console.log(error);
				console.log("error in POST search User side");
			  // req.flash("failure", err.message);
			  return res.redirect("/");
			}
	    console.log(body);
	    // console.log
	    if(response && response.statusCode == 200){
				var results = body.results;
				req.flash("success", "Successfully created account.");
		  // changed rendering of login page to just go ahead and log-in
		  // after signup.
	        res.render('services/search_results.ejs', {results:results});
	    }
	    console.log('cant search, going home');
	    res.render('dashboard.ejs');
	});
});

module.exports = router;