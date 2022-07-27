import mongoose from 'mongoose';
const {Schema,model} = mongoose;


const adminSchma = new Schema({
    userName : {
        type : "string",
        required : true
    },
    password : {
        type : "string",
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : true
    }
})
const Admin = model('Admin',adminSchma);

export default Admin;