import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const matchSchema = new Schema({
    country1 : {
        type:Object,
        required : true
    },
    country2 : {
        type:Object,
        required : true
    },
    id : {
        type:String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    fullTime:{
        type: Boolean, 
        required:false,
        default: false
    }
})
const Matches = model("Mathces",matchSchema);
export default Matches;