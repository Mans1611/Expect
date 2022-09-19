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
    votes : {
        type : Number,
        default : 0
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
    matchStatue : {
        type : String,
        default : "UpComing" 
    },
    
   time : {
    type : Object,
    default : {
        secondHalf_start : null,
        firstExtra_start : null,
        secondExtra_start : null,
    }
   },
    states : {
        type : Array,
        default : [],
        required : false
    },
    round : {
        type : String,
        required : true
    },
    deadMatch : {
        default : false,
        type : Boolean 
    }

    
})
const Matches = model("Matches",matchSchema);
export default Matches;