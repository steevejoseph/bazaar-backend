var mongoose = require('mongoose'),
    passportLocalMongoose = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: {type:String, default: 'Last Name'},

    // email validation will be done on frontend.
    email: String,
    username: String,

    // hashed password
    services:
    [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Service"
      }
    ],
    passwordHash: String,
    email:String,
    passwordHash: String, 
    type:String
});

// After we've defined the schema, use passport
// This goes ahead and adds important method that come with the passport
// package, that we need to use inorder to have user Authentication
// such as serialize() and deserialize()
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
