import mongoose from "mongoose";
const {model,Schema} = mongoose;


const PVP_Schema = new Schema({
    opponent1 : {type : String,required : true},
    opponent2 : {type : String,required : true},
    roomId : {type:String,required : true},
    matchId : {type:String, required : true},
    opponent1_expect : {type : Object, default:null},
    opponent2_expect : {type : Object, default:null},
    opponent1_points : {type : Number, default : 0},
    opponent2_points : {type : Number, default : 0},
})

const PVP = model('PVP',PVP_Schema);

export default PVP;
