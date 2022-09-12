import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const feedBackSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    name:{
        type : String,
        required : false
    },
    problemType : {
        type : String,
        required : false
    },
    helpSupport : {
        type : Boolean,
        default : false 
    }
})

const feedBack = model('Feedback',feedBackSchema);

export default feedBack;

