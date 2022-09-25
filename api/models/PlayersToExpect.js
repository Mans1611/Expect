import mongoose from "mongoose";
const { Schema, model } = mongoose;

const playersToExpectSchema = new Schema({
    playerName : {
        type : String,
        required : true, 
    },
    position : {
        type :String,
        required : true 
    },
    playerImg : {
        type : String,
        required : true, 
    },
    country : {
        type: Object,
        required : true
    },
    totalPoints : {
        type : Number,
        required : true, 
    },
    nextMatch : {
        required : true,
        type : String
    },
    index : {
        type : Number ,
        required : true 
    }
})
const playerToExpect = new model("playerToExpect",playersToExpectSchema);
export default playerToExpect;