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
    name:{type: String},
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    description:{type: String, default: "No description provided."},
    
    
    // photos is an array of objects, each with a url field.
      // (may add more fields in future.)
    // photos[i].url gives the photo's url.
    photos: {
        type: [{
          url: {type:String},
        }]
    },
    
    
    // set tags to be array of strings.
    // each tag given has to be a member of of defaultTags.
    tags:[{type:String, /*enum: defaultTags*/}],
    
    
    // options is an array of objects, each with a name, desc, and cost field.
    options: [{
      name: {type: String, required: true},
      description: {type:String, default:"No description provided."},
      cost: {type: Number, default: 1}
    }],
    
    
    // if reported, won't be shown (in theory).
    reported: {type: Boolean, default: false},
    
    price: {type: Number, default: 1}
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
