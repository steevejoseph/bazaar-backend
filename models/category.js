var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name:{type:String, unique:true, index:true},
    tags:{type:[String], unique:true}
});

var Category = mongoose.model('Category', categorySchema);

Category.collection.deleteMany({});

Category.collection.insertOne(new Category({
    name:"Service",
    tags:["legal", "software"]
}));

module.exports = Category;
