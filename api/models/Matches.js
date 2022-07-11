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
    fullTime:{
        type: Boolean, 
        required:false,
        default: false
    }
})
const Matches = model("Matches",matchSchema);
export default Matches;