import mongoose from 'mongoose';

const {model,Schema} = mongoose;

const expectsSchema = new Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    expects : {
        type:Array,
        default : []
    }
})

const expects = model('expects',expectsSchema);
export default expects ; 