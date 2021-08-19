const mongoose =require('mongoose');
const Schema= mongoose.Schema

const userSchema= new Schema({
    name:String,
    userName:String, 
    email:String,
    phoneNo:Number,
    userType:{
        type: String,
        default: "user",  
        enum: ["user", "admin"]   
      },
    password:String,
    confirmPassword:String
})
module.exports = mongoose.model('user',userSchema)