var mongoose = require('mongoose'),
    Category = require('./category.js');

var listingSchema = new mongoose.Schema({
    title:String,
    body:String,
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    category:{type:mongoose.Schema.Types.ObjectId, ref:"Category"},
    tags:[String]
});

listingSchema.statics.findByTags = function findByTags(tags, cb) {
    if(tags == undefined || tags.length == 0) {
        Category.findOne({ name:"Service" }, function(err, category) {
            if(err) {
                console.log(err);
            }
            console.log(category._id);
            return Listing.find({ category:category._id }, cb); 
        });
    }
    else
        return this.find({ tags:{ $in:tags } }, cb);
}

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
