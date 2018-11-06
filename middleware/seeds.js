var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var faker = require("faker");

const Service = require('../models/service.js');
const User = require('../models/user.js');

mongoose.connect('mongodb://team7:ABC123@ds263832.mlab.com:63832/largo-dev', {useNewUrlParser: true});

var services = [];
var users = [];


// node seed_services.js #_of_users_to_add max_number_of_services
// process.argv = [node, /path/to/services.js, #users, #services]
var numUsers    = (process.argv[2] || 10);
var numServices = (process.argv[3] || 50);

// drops DB of User and Service collections.
function clearDatabase() {
  User.remove({}, function(err) { 
    if(err) console.log(err)
     console.log('Users removed! '); 
  });
  
  Service.remove({}, function(err) { 
    if(err) console.log(err)
     console.log('Services removed! '); 
  });
}

function createUser(){
    request({
      url: "https://bazaar-backend.herokuapp.com/api/users/signup",
  	  method:'POST',
  	  json:{
  	    email:faker.internet.userName() + '@knights.ucf.edu',
  	    password:"12345"
  	  },
  	}, function(error, response, body){
  	     if(error){
  			   console.log(error);
  		   }
  
  	     if(response && response.statusCode == 201){
  	       //console.log(body);
  	       //console.log(body.createdUser);
  	       //users.push(body.createdUser);
  	       //console.log(users);
  	     }
  	 });
}

function createServices(userId, numServices) {
  
  for(var i = 0; i < numServices; i++) {
    
    var random = Math.floor((Math.random() * 7) + 3);
    var tags = [];
    
    for(var j = 0; j < numServices; j++){
        tags.push(faker.commerce.productAdjective());
    }

    Service.create({ 
      name: faker.company.companyName(),
      owner: userId, 
      description: faker.company.catchPhrase(),
      tags: tags
       }, function (err, service) {
        if (err) console.log(err);
        
        console.log(service);
        User.findByIdAndUpdate(userId, {$push: { services:service }}, function(err, service) {
          if(err) console.log(err);
        });
        
    });
    
  }
  
}

var _ = [];
function fill_(numUsers) {
  for(var i = 0; i < numUsers; i++){
    _.push(i);
  }
}
fill_(numUsers);





// clearDatabase();

// _.forEach(function(element){
//   createUser();
// });


// User.find({}, function(err, foundUsers){ 
//   if(err)console.log(err)
//   users = foundUsers;
  
//   users.forEach(function(user){
//     createServices(user._id, 3);
//   })

// }, () => mongoose.connection.close());
