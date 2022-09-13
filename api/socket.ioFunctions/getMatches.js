import Expects from "../models/Expects.js";
import Matches from "../models/Matches.js";
import AddingPointsToUsers from "../routes/utilis/addingPointsToUsers.js";
import User from "../models/User.js";


const  getMatches = async(userName)=>{
    try{
        const user = await Expects.findOne({userName});
        const matches = await Matches.find();
        const {userExpections,totalPoints} = AddingPointsToUsers(matches,user.expects);

        await User.findOneAndUpdate({userName},{userPoints:totalPoints});
        console.log("inside ugetMatches");
        console.log(userExpections);
        return {matches,userExpections,totalPoints};


    }catch(err){
        console.log(err);
    }
}

export {getMatches};