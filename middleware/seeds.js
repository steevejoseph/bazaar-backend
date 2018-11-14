var express = require('express');
var mongoose = require('mongoose');
var request = require('request');
var faker = require("faker");
var axios = require("axios");

const Service = require('../models/service.js');
const User = require('../models/user.js');

var signupUrl = "https://bazaar-backend.herokuapp.com/api/users/signup"
mongoose.connect('mongodb://team7:ABC123@ds263832.mlab.com:63832/largo-dev', {useNewUrlParser: true});

var services = [];

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

var users = [];

// plain user object
function createUsers() {
  var numToCreate = 20;
  var firstName, lastName, email, password, user;

  
  // create arr of iterable data
  for(var i = 0; i < numToCreate; i++) {

    firstName = faker.name.firstName();
    lastName = faker.name.lastName();
    email = firstName + "_" +  lastName + "@knights.ucf.edu";
    password = "12345";
    
    user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
    
    users.push(user);
  }
  
  // console.log(users);
}

function pushUsersToDatabase() {
  
  // arr of promises.
  var promises = [];
  
  // fill up array of promises.
  users.forEach(function(user){
    promises.push(axios.post(signupUrl, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    }));
  });
  
  // fulfill promises all at once.
  axios.all(promises).then(result => {
     console.log("done making users!"); 
  });
}

function pullUsersOut(){
  var foundUsers;

  User.find({}).exec()
  .then(users => {
    // iterate thru users and add a service for each.
    users.forEach(function(user){
      insertServicesIntoUser(user);
     });
  })
  
  .catch(err => {
    console.log(err);
  });
}


function insertServicesIntoUser(user){
  
  // generate random number of tags.
  var tags = [], numTags = Math.floor((Math.random() * 7) + 3);

  for(var j = 0; j < numTags; j++){
    tags.push(faker.commerce.productAdjective());
  }    


  // try for interting 1-5 services for each user.
  var numServices = Math.floor((Math.random() * 5) + 1);

  for(var j = 0; j < numServices; j++) {
    
    // try to create a service for the user passed in.
    Service.create({
      name:faker.company.companyName(),
      description: faker.company.catchPhrase(),
      owner: user._id,
      tags: tags,
      reported: false
    }, function(err, service){
         if(err){
           console.log(err);
         }else {
           User.findByIdAndUpdate(user._id, {$push: { services:service }}, function(err, service) {
             if(err) console.log(err);
           });
         }
      
    });
  }
}



// working as expected.
// clearDatabase(); 

// working as expected.
createUsers();

// working as expected.
pushUsersToDatabase();

// needs more testing, working for the most part.
pullUsersOut();
