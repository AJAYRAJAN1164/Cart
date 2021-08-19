const mongoose =require('mongoose');
const Schema= mongoose.Schema

const productsSchema= new Schema({
    name:String,
    category:String, 
    price:String,
    description:String,
})
module.exports = mongoose.model('products',productsSchema)