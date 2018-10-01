var express = require('express');

var middleware = require('../middleware/index.js'),
    Service = require('../models/service.js'),
    mongoose = require('mongoose'),
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

router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('services/new.ejs');
});

router.post('/new', middleware.isLoggedIn, function(req, res){
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

module.exports = router;