var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email:String,
    passwordHash: String, 
    type:String
});

module.exports = mongoose.model('User', userSchema);
