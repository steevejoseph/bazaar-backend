var mongoose = require('mongoose');

var defaultTags = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Business",
  "Fun & Lifestyle",
  
  
  "Lessons/Tutoring",
  "Event Management",
  "Beauty",
  "E-Commerce",
  "Photography",
  
];


var serviceSchema = new mongoose.Schema({
    name:{type: String, required: true},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    description:{type: String, default: "No description provided."},
    
    // set tags to be array of strings.
    // each tag given has to be a member of of defaultTags.
    //going to look at diffrent ways to implement tags that may be easier to use
   tags: [String],
    
    
    // if reported, won't be shown (in theory).
    reported: {type: Boolean, default: false},
    
    price: {type: Number, default: 1},
    photos: {
        type:[String], 
        default: []
    }
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
