import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const UserSchema = new Schema ({
    userName:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    phoneNumber:{type:String},
    password:{type:String,required:true},
    userCountry: {type:String,required:true},
    userPoints :{type:Number,default:0},
    isAdmin:{type:Boolean,default:false},
    isVerified : {type:Boolean,default:false},
    team : {type : Object, default : null},
    userStanding : {type:Number,required:true},
    token : {type : String, required : true},
    invitations : {type : Array},
    sendInvitations:{type : Array},
    goldenPlayer : {type:Object,default:{
        player:null,
        updateCounter : 1
    }}
})

const User = model('User' , UserSchema );
export default User;
