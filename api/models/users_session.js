import mongoose from "mongoose";

const {Schema,model} = mongoose;
const ONE_HOUR = 3600;

const sessionSchema = new Schema({
    CreateAt : {
        type : Date,
        default : new Date()
    },
    user: {
        type : String,
    },
    session_id :{
        type : String,
    },
    device : {
        type : String,
        
    }
})

sessionSchema.index({ CreateAt: 1 }, { expireAfterSeconds: ONE_HOUR });

const session = model("session",sessionSchema);

export default session;

