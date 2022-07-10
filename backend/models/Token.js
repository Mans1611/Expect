const {Schema,model} =  require('mongoose');
const tokenSchema = new Schema ({
    token : {type:String},
    id : {type:String}
})
const Token = model("Token" , tokenSchema);
module.exports = Token;





