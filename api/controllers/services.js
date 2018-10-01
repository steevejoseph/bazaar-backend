const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://team7:ABC123@ds263832.mlab.com:63832/largo-dev', {useNewUrlParser: true});

const Service = require('../../models/service.js');

exports.service_create = (req, res, next) => {
    //create a new service 
    const service = new Service({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description, //weird formatting may need to change the name
        tags: req.body.tags
    });
}
//need to make get all
exports.service_get = (req, res, next) => {
    
}
//need to make search