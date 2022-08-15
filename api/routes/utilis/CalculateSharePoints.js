import Expects from "../../models/Expects.js";

const CalculateSharePoints = async(userTeamExpects,userName)=>{
    let sharePoints = 0;
    const {expects:totalExpects} = await Expects.findOne({userName});
    const updatedExpects = userTeamExpects.map((userTeamExpect)=>{
        return totalExpects.find(expect=>{
            if(expect.matchId === userTeamExpect.matchId){
                sharePoints += userTeamExpect.userPoints;
                console.log(userTeamExpect);
            }
        });
    
    })

    return {updatedExpects,sharePoints};
     

}
export default CalculateSharePoints;