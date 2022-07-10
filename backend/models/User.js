const {Schema,model} = require('mongoose');

const UserSchema = new Schema ({
    username:{type:String},
    email:{type:String},
    phonenumber:{type:String},
    pw1:{type:String},
    country: {type:String},
    point :{type:Number},
    isAdmin:{type:Boolean,default:false},
    isVerified : {type:Boolean,default:false},
    Expects : {type:Array},
    profilePic:{type:String,default:""},
},{timestamps:true})

const User = model("User" , UserSchema );
module.exports = User;
