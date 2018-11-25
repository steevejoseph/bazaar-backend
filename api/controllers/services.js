const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://team7:ABC123@ds263832.mlab.com:63832/largo-dev', {useNewUrlParser: true});

const Service = require('../../models/service.js');
const Comment = require('../../models/comment.js');
exports.service_create = (req, res, next) => {
  
    // console.log(req.headers.authorization);
  var tagList
  console.log(req.body.tags);
  /*for(var i = 0; i < req.body.tags.length; i++) {
      tagList[i] = req.body.tags[i]
  }*/
    //create a new service 
  var srv =  new Service({
    name: req.body.name,
    owner: req.userData.userId,
    description: req.body.description,
    price: req.body.price,
    reported: false,
    tags: req.body.tags
    
  });

   srv.save()
   .then(service => {
     Service.find({}, function(err, services) {
         if(err) console.log(err);
        
        
        res.status(200).json({
            createdService: srv,
            //services: services,
            //service : service        
        });
      
     });
    })
    .catch(err => {
      console.log(err);
      Service.find({}, function(err, services) {
         if(err) console.log(err);
        
        
        res.status(500).json({
          error: err,
          badserv: srv
          //services : services        
        });
      
     });
    });
}


//this is get all
exports.service_index = (req, res, next) => {
    Service.find({}, function(err, services) {
         if(err){
             console.log(err);
             res.status(500).json({
             error: err,
             });
         } 
        
        res.status(200).json({
          services: services,
        });
      
     });
}

//search by tag
exports.service_search_tags = (req, res, next) => {
    var toSearch = req.body.query;
    var query = Service.where({tags: req.body.tags});
    var regex = {'$regex': toSearch, '$options': 'i'};
    query.find({
        '$or': [{name: regex},
                {description: regex}
                ]}, function(err, services) {
                    if(err){
                        console.log(err)
                        return res.status(500).json({
                            error: err
                        })
                    }
                    else {
                        return res.status(200).json({
                            results: services
                        })
                    }
                })
}

//made search boi
exports.service_search = (req, res, next) => {
    var query = req.body.query;
    var regex = {'$regex': query, '$options': 'i'};

    Service.find({
        '$or': [{name: regex},
                {tags: regex},
                {description: regex}
                ]}, function(err, services) {
        if(err){
            console.log(err);
            return res.status(500).json({
                error: err,
            });
        } 

        return res.status(200).json({
            results: services,
        });
    });
}

//edit service boiii
exports.service_edit = (req, res, next) => {
    var serviceId = mongoose.Types.ObjectId(req.body.id);
    var query = Service.where({_id : serviceId})
    var toUpdate = query.findOne(function (err, found) {
        if(err) {
            res.status(500).json({
                error: err
            })
        } else if(found == null) {
            res.status(500).json({
                msg: 'service to update not found'
            })
        } else if(found.owner == req.userData.userId) {
            Service.findOneAndUpdate({_id : serviceId}, {
                name : req.body.name,
                description : req.body.description,
                price: req.body.price,
                tags: req.body.tags
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
    })
    
}

//delete service
exports.service_delete = (req, res, next) => {
    var serviceId = mongoose.Types.ObjectId(req.body.id);
    var query = Service.where({_id : serviceId});
    var toDelete = query.findOne(function (err, found){
        
        if(err) {
            //handel error
            res.status(500).json({
                error: err
            })
        }
        if(found == null){
            res.status(404).json({
                msg: 'no service matching id found'
            })
        } else if(found.owner == req.userData.userId){
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
        });}
        
    });
}

// get specific service 
//  (api/services/:id)
exports.service_get = (req, res, next) => {
    var serviceId = mongoose.Types.ObjectId(req.params.id);
    var sev = Service.where({_id: serviceId});
    sev.findOne((err, service) => {
        if(err){
            res.status(500).json({
                error: err
            })
        } else if(service == null) {
            res.status(404).json({
                msg: 'service not found'
            })
        } else {
            var query = Comment.where({serviceId: serviceId});
            query.find((err, comments) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    return res.status(200).json({
                        service: service,
                        comments: comments
                    })
                }
                
            })
        }
    })
    
}

//get all of a users services
exports.service_get_user_service = (req, res, next) => {
    var userId = mongoose.Types.ObjectId(req.params.usersId);
    
    var query = Service.where({owner: userId});
    query.find((err, found) => {
        if(err) {
            return res.status(500).json({
                error: err
            })
        } else if(found[0] == null) {
            res.status(404).json({
                msg: 'no services found for user',
                userServices: []
            })
        } else {
            return res.status(200).json({
                userServices: found
            })
        }
    })   
}



exports.service_create_comment = (req, res, next) => {
    
    var servId = mongoose.Types.ObjectId(req.body.serviceId)
    var query = Service.where({_id: servId});
    var ownerId = mongoose.Types.ObjectId(req.userData.userId)
    query.findOne((err, found) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }else if(found == null){
            return res.status(404).json({
                msg: 'sevice not found'
            })
        } else if(found.owner == ownerId) {
            return res.status(403).json({
                msg: 'you can not rate your own service'
            })
        } else {
            
            var cquery = Comment.where({
                owner: ownerId,
                serviceId: servId
            })
            cquery.find((err, foundC) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }
                else if(foundC.length > 0) {
                    return res.status(400).json({
                        msg: 'you can not make multiple ratings for the same service'
                    })
                } else {
                    if(req.body.rateing != null && req.body.rateing >= 0 && req.body.rateing <= 5) {
                        var newComment = new Comment({
                            owner: req.userData.userId,
                            serviceId: req.body.serviceId,
                            comment: req.body.comment,
                            rateing: req.body.rateing
                        
                            })
                            newComment.save();
                            return res.status(200).json({
                                createdComment: newComment
                            })
                        } else {
                            return res.status(400).json({
                                msg: 'rating must be a value from 0 to 5'
                            })
                        }
                }
            })
            
        }
        
    })
    
}
