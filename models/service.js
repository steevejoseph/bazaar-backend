var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    title:String,
    author:String,
    description:String,
    tags:[String]
});

module.exports = mongoose.model('Service', serviceSchema);
