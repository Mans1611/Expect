import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const UserSchema = new Schema ({
    userName:{
        type:String,required:true,unique:true
    },
    email:{type:String,required:true},
    phoneNumber:{type:String,unique:true},
    password:{type:String,required:true},
    userCountry: {type:String,required:true},
    userPoints :{type:Number,default:0},
    isAdmin:{type:Boolean,default:false},
    isVerified : {type:Boolean,default:false},
    expects : {type:Array,default:[]}
})

const User = model('User' , UserSchema );
export default User;
