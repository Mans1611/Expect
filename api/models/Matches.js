import mongoose from 'mongoose';
const {Schema,model} = mongoose;

const matchSchema = new Schema({
    firstCountry : {
        type:Object,
        required : true
    },
    secondCountry : {
        type:Object,
        required : true
    },
    matchId : {
        type:String,
        required : true
    },
    matchTime : {
        type : String,
        required : true
    },
    started:{ 
        type: Boolean, 
        required:false,
        default: false
    },
    fullTime:{ 
        type: Boolean, 
        required:false,
        default: false
    },
    states : {
        type : Array,
        default : [],
        required : false
    }
    
})
const Matches = model("Matches",matchSchema);
export default Matches;