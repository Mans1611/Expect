import Expects from "../../models/Expects.js";
import Matches from "../../models/Matches.js";
import Teams from "../../models/Teams.js";
import User from "../../models/User.js";
import Filter_User_Expects_4Team from "./FilterUserExpectsForTeam.js";


const CalculateTotalTeamPoints = async(team)=>{
    // const matches = await Matches.find();
    let totalTeamPoints = 0 ;
    let totalExpects = [];
    const updateTeamMembersExpects = []; // array which will include the updated data about members.
    for(let member of team.teamMembers){
        let sharePoints = 0;
        const {expects} = await Expects.findOne({userName : member.userName});
        // return array
        const teamUserExpects = Filter_User_Expects_4Team(expects,member.joinedTime,totalTeamPoints);   
        // calculate the sharePoints forEach user. 
        teamUserExpects.forEach(expect=> sharePoints += expect.userPoints);
       
        totalExpects= [...teamUserExpects,...totalExpects];
        
        // this to update the the team in the user model.
        updateTeamMembersExpects.push({...member,expect : teamUserExpects, sharePoints});
        await User.updateOne({userName:member.userName} , {$set : {"team.sharePoints" : sharePoints}})
    }

    totalExpects.forEach(expect=> {totalTeamPoints += expect.userPoints});
    console.log(team.leftPoints);
    const UpdatedTeam = {
        teamPoints : totalTeamPoints + team.leftPoints ,  // in case of any members who might left the team. 
        teamMembers : updateTeamMembersExpects 
    }
    await Teams.updateOne({teamName : team.teamName},UpdatedTeam);

    return {totalExpects,totalTeamPoints : totalTeamPoints + team.leftPoints};

}

export default CalculateTotalTeamPoints;