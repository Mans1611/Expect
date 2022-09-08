import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const countrySchema = new Schema({
    countryName:{
        type:String,
        required:true
    },
    logo : {
        type:String,
        required:true
    },
    players : {
        type:Array,
        required:true
    },
    eliminated : {
        type:Boolean,
        default:false
    },
    group : {
        type : String,
        required : true
    },
    points : {
        type : Number,
        default : 0
    }


})
const Country = model('Country',countrySchema);
export default Country;