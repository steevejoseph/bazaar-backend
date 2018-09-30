var express = require('express');

var middleware = require('../middleware/index.js'),
    Listing = require('../models/listing.js'),
    Category = require('../models/category.js'),
    mongoose = require('mongoose'),
    router  = express.Router();
    
    
router.get('/', function(req, res){
    Listing.findByTags([], function(err, listings){
        if(err){
            console.log(err);
            req.flash("failure", err.message);
            return res.redirect('/users/' + req.user._id);
        }
        
        console.log(listings);
        res.render('listings/index.ejs', {listings:listings});
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
    Category.find({}, function(err, categories) {
        if(err){
            console.log(err);
        }

        console.log(categories);
        res.render('listings/new.ejs', {categories:categories});
    });
});

router.post('/new', middleware.isLoggedIn, function(req, res){
    // req.user
    Listing.collection.insertOne(new Listing({
        title:req.body.title,
        body:req.body.description,
        user:req.user,
        category:req.body.category,
        tags:[req.body.tag]
    }));
    res.redirect('/listings');
});

module.exports = router;
