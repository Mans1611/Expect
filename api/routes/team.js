import express from 'express';
import TeamValidation from '../middleware/TeamValidation.js';
import crypto from 'crypto' ; 
import MakeCode from './utilis/RandomChar.js';
import Teams from '../models/Teams.js';
import User from '../models/User.js';
import joinTeamValidation from '../middleware/JoinTeamValidation.js';
const team = express.Router();



team.post('/createteam',TeamValidation,async(req,res)=>{
    const { userName , teamName , user } = req.body;

    const teamCode = MakeCode(20);
   
    // creating a team 
    const team = new Teams({
        teamName ,
        teamCode,
        teamMembers : [{
            userName : user.userName,
            totalPoints : user.userPoints
        }]
    })
    // pushing the user to the team
    
    // saving a team
    await team.save(()=>{
        console.log("team is created succ");
    });

    user.team = team;
    await User.updateOne({userName},user);
    
    // sending the teamCode back to the client so he can invite his friends
    const data = JSON.stringify({teamCode,msg: "Created Successfully"});
    console.log("The Data is " + data);
    res.status(201).send(data);


})


team.put('/jointeam',joinTeamValidation,async(req,res)=>{
    console.log(req.body);
    const { user, team, teamCode, userName } = req.body;
    team.teamMembers.push({
        userName : user.userName,
        totalPoints : user.userPoints
    });
    user.team = team;
    
   
    // await Teams.updateOne({teamCode}, team);
    // await User.updateOne({userName}, user);

    res.status(200).send("joined Successfully");
})


// i expect sending from front end username of the leaving user. 
team.put('/leaveteam',async(req,res)=>{
    
    const {userName} = req.body; 
    let user = await User.findOne({userName});
    if(!user.team) 
        return res.status(400).send("You are not in a team!");
    let team = await Teams.findOne({teamName : user.team.teamName});

    // so we filter out the speceific team member. 
    team.teamMembers = team.teamMembers.filter((member)=> member.userName !==userName);
    
    // so we make it null since he left the team.
    user.team = null ;
    await User.updateOne({userName},user);
    await Teams.updateOne({teamName : team.teamName},team);
    res.status(200).send(team)
})


export default team;