const mongoose = require('mongoose')
    
    
var commentSchema = new mongoose.Schema({
    serviceId: {type: mongoose.Schema.ObjectId, ref: "Service", required: true},
    comment: String,
    rateing: Number,
    owner: {type: mongoose.Schema.ObjectId, ref:"User", required: true}
})

module.exports = mongoose.model('Comment', commentSchema);