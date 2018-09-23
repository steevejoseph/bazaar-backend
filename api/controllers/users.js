//this user controller which contains the logic for the requests for the api
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //normal bcrypt has issues with heroku thus the use of bcryptjs
const jwt = require('jsonwebtoken'); //for creation of tokens to authentication
mongoose.connect('') //need to put mongoose url

const saltRounds = 10; //number of times to salt password hash

const User = require('../../models/user.js'); //require the user schema

exports.user_signup = (req, res, next) => {
    User.find({email: req.body.email}).exec()
        .then(user =>{
          //email already used
          if(user.length >= 1) {
            return res.status(409).json({
              message: 'Email already used'
            })
            //email has not been used good to create an account
          }else {
            //hashes the users password before storeing it
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
              if(err) {
                return res.status(500).json({
                  error: err
                });
              } else {
                const user = new User({
                  email: req.body.email,
                  passwordHash: hash
                });
                user.save();
                res.status(201).json({
                  message: 'sucessful user creation',
                  //createdUser: user
                });
                console.log(user);
              }
            });
          }
        });
}

exports.user_login = (req, res, next) => {
  User.find({email: req.body.email}).exec()
  .then(user => {
    if(user.length < 1) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    bcrypt.compare(req.body.password, user[0].passwordHash, (err, result) => {
      if(err) {
        return res.status(401).json({
          message: 'Authentication failed'
        });
      }
      if(result) {

        const token = jwt.sign(
          {
          email: user[0].email,
          userId: user[0]._id
          },
          "8faHdXnNLhKxfjydSFChsjmcTWZt",
          {
            expiresIn: "1 hour"
          }
        );

        return res.status(200).json({
          message: 'Authentication sucessful',
          token: token
        });
      }
      return res.status(401).json({
        message: 'Authentication failed'
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
        message: 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
}