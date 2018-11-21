const express = require('express');
const mongoose = require('mongoose');

const imgur = require('imgur');
imgur.setClientId('2ce55c3b8fb0ca4');
imgur.setAPIUrl('https://api.imgur.com/3/');

const Service = require('../../models/service.js');
mongoose.connect('mongodb://team7:ABC123@ds263832.mlab.com:63832/largo-dev', {useNewUrlParser: true});

// POSTS to ${ROOT_URL}/photos/service/:serviceId/create
exports.photo_create_service = (req, res, next) => {
    console.log(JSON.stringify(req.file));
    const file = (req.file.path);

    Service.findById(req.params.serviceId, function(err, service){
        if(err) {
            console.error(err);
            return res.status(500).json({
                message: 'Could not find service.',
                err: err
            });
        }
    
        if(service.owner != req.userData.userId) {
            console.log("owner: " + service.owner);
            console.log("reqer: " + req.userData.userId);
            return res.status(401).json({
                message: 'The requestor is not the owner of the service.'
            });
        }
            
        imgur
          .uploadFile(file)
          .then(function (json) {
            console.log(json.data.link);
            service.photos.push(json.data.link);
            service.save(function(err){
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        message: 'Could not upload image.',
                        err: err
                    });
                }
                else{
                    
                    return res.status(200).json({
                        message: 'Image uploaded successfully.',
                        url: json.data.link
                    });
                }
            });
          })  
          .catch(function (err) {
            console.error(err);
              res.status(500).json({
                message: 'Could not upload image.',
                err: err
              });
        });
    });
};