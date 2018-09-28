var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    name:String,
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    description:String,
    tags:[String]
});

module.exports = mongoose.model('Service', serviceSchema);
