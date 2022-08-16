import mongoose from 'mongoose'
const {Schema,model} = mongoose;

const teamSchema = new Schema({
    teamName : {
        type :  String,
        required : true
    },
    teamPoints : {
        type : Number,
        default : 0
    } ,
    teamMembers : {
        type : Array,
        default : []
    },
    teamCode : {
        type : String,
        required : true
    },
    teamStanding : {
        type : Number,
        required : false, 
    },
    leftPoints : {
        type : Number,
        default : 0,
    }
    

})


const Teams = model("Teams",teamSchema);
export default Teams