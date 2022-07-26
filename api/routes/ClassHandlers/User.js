import User from "../../models/User.js";

class Users{

    async orderUsers(){
        return await User.find().sort({userPoints : -1});   
    }
    
}


export {Users};