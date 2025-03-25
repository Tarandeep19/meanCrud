const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    password:String,
    address:String,
});
const User=mongoose.model("users",userSchema);
module.exports=User;