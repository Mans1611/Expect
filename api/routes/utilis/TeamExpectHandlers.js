
import Teams from "../../models/Teams.js";

const PushExpectToMember = async(user,expect,matchTime,round)=>{

    let team = await Teams.findOne({teamName : user.team.teamName});
    team.teamMembers.map(async (member,index)=>{
        if(member.userName === user.userName){
            team.teamMembers[index].expects.push({matchTime,round,...expect})
            await Teams.updateOne({teamName : user.team.teamName},team)
            return null;
        }
    })
}

const UpdateExpectForMember = async(user,matchId,updatedExpect)=>{
    let team = await Teams.findOne({teamName : user.team.teamName});
    for(let i = 0; i < team.teamMembers.length ; i++){
        if(team.teamMembers[i].userName === user.userName){
            team.teamMembers[i].expects = team.teamMembers[i].expects.map(expect=>{
                if(expect.matchId === matchId)
                    expect = updatedExpect;
                return expect;
            })
            await Teams.updateOne({teamName : user.team.teamName},team)
            break;
        }
    }
}

const DeleteExpectFromMember = async(user,matchId)=>{
    let team = await Teams.findOne({teamName : user.team.teamName});
    for(let i = 0; i < team.teamMembers.length ; i++){
        if(team.teamMembers[i].userName === user.userName){
            team.teamMembers[i].expect = team.teamMembers[i].expects.filter((expect)=> expect.matchId !== matchId);
            await Teams.updateOne({teamName : user.team.teamName},team)
            break;
        }
    }
}


export {PushExpectToMember , UpdateExpectForMember , DeleteExpectFromMember}; 