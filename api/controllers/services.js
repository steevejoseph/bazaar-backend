const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://team7:ABC123@ds263832.mlab.com:63832/largo-dev', {useNewUrlParser: true});

const Service = require('../../models/service.js');

exports.service_create = (req, res, next) => {
    //create a new service 
  var srv =  new Service({
    name:req.body.name,
    owner:req.user,
    description:req.body.description,
  });

   srv.save()
   .then(service => {
     Service.find({}, function(err, services) {
         if(err) console.log(err);
        
        
        res.status(200).json({
          services: services,
          service : service        
        });
      
     });
    })
    .catch(err => {
      console.log(err);
      Service.find({}, function(err, services) {
         if(err) console.log(err);
        
        
        res.status(500).json({
          error: err,
          services : services        
        });
      
     });
    });
}


//need to make get all
exports.service_get = (req, res, next) => {
    
}

//made search boi
exports.service_search = (req, res, next) => {
    Service.search(req.body.query).exec()
    .then(results => {
      res.status(200).json({
        results : results        
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
}

//edit service boiii
exports.service_edit = (req, res, next) => {
    var serviceId = mongoose.Types.ObjectId(req.body.id);
    Service.findOneAndUpdate({_id : serviceId}, {
        name : req.body.name,
        description : req.body.description
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
}

exports.service_delete = (req, res, next) => {
    var serviceId = mongoose.Types.ObjectId(req.body.id);
    Service.findOneAndRemove({_id : serviceId})
    .exec().then(result => {
        
        Service.find({}, function(err, services){
            if(err){
                res.status(500).json({error:err});
            }else{
                res.status(200).json({
                result : result,
                services: services
              });
                
            }
        });
       
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
}


