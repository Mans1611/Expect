import mongoose from 'mongoose';
const {Schema,model} = mongoose;
const tokenSchema = new Schema ({
    token : {type:String},
    id : {type:String}
})
const Token = model("Token" , tokenSchema);
export default Token;





