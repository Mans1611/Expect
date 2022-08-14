import Teams from "../models/Teams.js"
import User from "../models/User.js";


const joinTeamValidation = async (req,res,next)=>{
    req.body = JSON.parse(req.body.data);

    const { teamCode, userName } = req.body;
    const team = await Teams.findOne({teamCode})
    const user = await User.findOne({userName})
    // check if team exist.
    if(!team)
        return res.status(400).send({msg :"The Code you have provided is invalid"});
    // check if user is already in a team or not, so he cant joined many teams.   
    if(user.team)
        return res.status(400).send({msg : "You are already in a team"});
    // check if team members excede 5 members or not.
    if(team.teamMembers.length >=5 )
        return res.status(400).send({msg : "This Team has 5 members, which is the maximum"});  

    // as I already fetch for it so i will assign it to the next middleware, so next middleware dont fetch for it again. 
    req.body.user = user;
    req.body.team = team;

    next()
}


export default  joinTeamValidation;

