//this user controller which contains the logic for the requests for the api
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //normal bcrypt has issues with heroku thus the use of bcryptjs need to change to use same thing as last project (passport)
const jwt = require('jsonwebtoken'); //for creation of tokens to authentication
mongoose.connect('mongodb://team7:ABC123@ds263832.mlab.com:63832/largo-dev', {useNewUrlParser: true});
const Chatkit = require('@pusher/chatkit-server');

const saltRounds = 10; //number of times to salt password hash

const User = require('../../models/user.js'); //require the user schema
const Service = require('../../models/service.js');


 // init chatkit
    const chatkit = new Chatkit.default({
      instanceLocator: 'v1:us1:b90a149b-4af4-4243-9831-b133bff9a54e',
      key: 'fadcb22d-249f-46f4-8845-033e54dff6b0:dpARnzZfmp8Wt05149mHGY/1Gh+jQY3KF9PsxK721ws=',
    })




exports.user_signup = (req, res, next) => {
    var userEmail = req.body.email.toLowerCase()
    
    User.find({email: userEmail}).exec()
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
                  email: userEmail,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  passwordHash: hash,
                  favorites: []
                });
                user.save();
                
                // init chatkit
                const chatkit = new Chatkit.default({
                  instanceLocator: 'v1:us1:b90a149b-4af4-4243-9831-b133bff9a54e',
                  key: 'fadcb22d-249f-46f4-8845-033e54dff6b0:dpARnzZfmp8Wt05149mHGY/1Gh+jQY3KF9PsxK721ws=',
                })
                
                chatkit.createUser({ 
                  id: user._id, 
                  name: user.firstName 
                 })
                 
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
  var userEmail = req.body.email.toLowerCase()
  User.findOne({email: userEmail}).exec()
  .then(user => {
    // console.log("type: " + typeof user +" user:\n"+user);
    if(user === {} || user === null || user === undefined) {
      return res.status(401).json({
        message: 'Authentication failed'
      });
    }
    bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
      if(err) {
        console.log(err);
        return res.status(401).json({
          message: 'Authentication failed'
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

var favServiceList = []
exports.user_get = (req, res, next) => {
  var num = 0
  favServiceList = []
 // var listTest
  User.findById(req.params.userId).exec()
  .then(user => {
    var promises = []
    
      
      //if(user.favorites != [] && user.favorites != null){
        user.favorites.forEach((favServiceId) => {
          const promise = new Promise((resolve) => {
            var id = mongoose.Types.ObjectId(favServiceId);
            var favService = Service.where({_id: id});
            favService.findOne((err, found) => {
            if(err) {
               req.status(500).json({
               error: err
               })
             }
            if(found != null) {
               //console.log(found)
               favServiceList.push(found);
               num++;
               resolve();
              console.log(favServiceList);
             } else {
               resolve();
             }
             //console.log(favServiceList);
           })
          });
          
            //var favService = "apple pie";
            //console.log(favServiceList);
            promises.push(promise);
        })
      /*} else {
        return res.status(200).json({
          user: user,
          favoriteServices: favServiceList,
          number: num
        });
      }*/
    
    
    
    Promise.all(promises).then(() => {
      //console.log("list of favs");
      //console.log(promises);
      return res.status(200).json({
        user: user,
        favoriteServices: favServiceList,
        number: num
      });
      
      
    }).catch((err) => {
      return res.response(500).json({
        error: err
      })
    })
  })
}

exports.user_index = (req, res, next) => {
  User.find({}, function(err, users){
    if(err){
      console.log(err);
      return res.status(500).json({
        message:'Cannot get users.'
      });
    }
    
    res.status(200).json({
      users: users
    });
    
  });
}


exports.user_edit = (req, res, next) => {
  
  
}



exports.user_add_favorite = (req, res, next) => {
  var newFavList = [];
 
  var toFavorite = req.body.newFavoriteId
  User.findOne({_id: req.userData.userId}, (err, found) => {
    if(err) {
      return res.status(500).json({
        error: err
      })
    }
    console.log("found: ", found.favorites);
    newFavList = newFavList.concat(found.favorites);
    console.log(toFavorite);
    newFavList.push(toFavorite);
    console.log(newFavList);
    //newFavList.concat(found.favorites);
    
    User.findOneAndUpdate({_id: req.userData.userId}, {
      favorites: newFavList
    }, {'new' : true})
              .exec().then(result => {
                  res.status(200).json({
                      result : result        
                  });
              })
              .catch(err => {
                  console.log(err);
                  return res.status(500).json({
                      error: err
                  });
              });
  })
  
  
}





