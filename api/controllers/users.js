//this user controller which contains the logic for the requests for the api
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //normal bcrypt has issues with heroku thus the use of bcryptjs need to change to use same thing as last project (passport)
const jwt = require('jsonwebtoken'); //for creation of tokens to authentication
mongoose.connect('mongodb://team7:ABC123@ds263832.mlab.com:63832/largo-dev', {useNewUrlParser: true});

const saltRounds = 10; //number of times to salt password hash

const User = require('../../models/user.js'); //require the user schema

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email}).exec()
        .then(user =>{
          // console.log(user);
          //email already used
          if(user.length >= 1) {
            return res.status(409).json({
              message: 'Email already used: ', user
            })
            //email has not been used good to create an account
          }else {
            //hashes the users password before storeing it can be moved in a pre save function in the schema
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => { 
              if(err) {
                return res.status(500).json({
                  error: err
                });
              } else {
                const user = new User({
                  email: req.body.email,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  passwordHash: hash
                });
                user.save();
                const token = jwt.sign({
                  email: user.email,
                  userId: user._id
                  },
                  "8faHdXnNLhKxfjydSFbtEjmcTWZt",
                  {
                    expiresIn: "1 hour"
                  }
                );
                res.status(201).json({
                  message: 'User created.',
                  createdUser: user,
                  token: token,
                  userId: user._id
                });
                console.log(user);
              }
            });
          }
        });
}

exports.user_login = (req, res, next) => {
  User.findOne({email: req.body.email}).exec()
  .then(user => {
    // console.log("type: " + typeof user +" user:\n"+user);
    if(user === {} || user === null || user === undefined) {
      return res.status(401).json({
        message: 'Authentication failed 1'
      });
    }
    bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
      if(err) {
        console.log(err);
        return res.status(401).json({
          message: 'Authentication failed 2'
        });
      }
      if(result) {

        const token = jwt.sign(
          {
          email: user.email,
          userId: user._id
          },
          "8faHdXnNLhKxfjydSFbtEjmcTWZt",
          {
            expiresIn: "1 hour"
          }
        );

        return res.status(200).json({
          message: 'User authenticated.',
          token: token,
          user: user
        });
      }
      return res.status(401).json({
        message: 'Authentication failed 3'
      });
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({
      error: err
    });
  });
}

exports.user_delete = (req, res, next) => {
    User.remove({_id: req.params.userID}).exec()
    .then(result => {
      result.status(200).json({
        message: 'User deleted.'
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
}

exports.user_get = (req, res, next) => {
  User.findById(req.params.userId).exec()
  .then(user => {
    res.status(200).json({
      user: user
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({
      message:'can\'t get users :/'
    });
  })
}

exports.user_index = (req, res, next) => {
  User.find({}, function(err, users){
    if(err){
      console.log(err);
      return res.status(500).json({
        message:'can\'t get users :/'
      });
    }
    
    res.status(200).json({
      users: users
    });
    
  });
}
exports.user_edit = (req, res, next) => {
  
  
}






