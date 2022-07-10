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
        required:false
    },
    eliminated : {
        type:Boolean,
        default:false
    }
})
const Country = model('Country',countrySchema);
export default Country;