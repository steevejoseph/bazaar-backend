var mongoose = require('mongoose');

var listingSchema = new mongoose.Schema({
    title:String,
    body:String,
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    category:{type:String, ref:"Category"},
    tags:[String]
});

listingSchema.index({
    title:'text',
    body:'text',
    category:'text',
    tags:'text'
});

listingSchema.statics.search = function search(query, cb) {
    return this.find(
        {$text: {$search:query}},
        {score: {$meta:'textScore'}}
    ).sort({score: {$meta:'textScore'}}, cb);
}

listingSchema.statics.findByTags = function findByTags(tags, cb) {
    if(tags == undefined || tags.length == 0)
        return this.find({ category:"Service" }, cb);
    else
        return this.find({ tags:{ $in:tags } }, cb);
}

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
