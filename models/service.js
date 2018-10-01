var mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema({
    name:String,
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    description:String,
    tags:[String]
});

serviceSchema.index({
    name:'text',
    description:'text',
    tags:'text'
});

serviceSchema.statics.search = function search(query) {
    return this.find(
        {$text: {$search:query}},
        {score: {$meta:'textScore'}}
    ).sort({score: {$meta:'textScore'}});
}

module.exports = mongoose.model('Service', serviceSchema);
