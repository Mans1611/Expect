import express from 'express';
import TeamValidation from '../middleware/TeamValidation.js';
import crypto from 'crypto' ; 
import MakeCode from './utilis/RandomChar.js';
import Teams from '../models/Teams.js';
import User from '../models/User.js';
import joinTeamValidation from '../middleware/JoinTeamValidation.js';
import CalculateSharePoints from './utilis/CalculateSharePoints.js';
import {SortingTeams} from './utilis/SortingTeams.js';
import Expects from '../models/Expects.js';
import Filter_User_Expects_4Team from './utilis/FilterUserExpectsForTeam.js';
//import CalculateSharePoints from './utilis/CalculateSharePoints.js';
import CalculateTotalTeamPoints from './utilis/CalculateTotalTeamPoints.js';

const team = express.Router();

team.post('/createteam',TeamValidation,async(req,res)=>{
    const { userName , teamName , user } = req.body;
    const teamCode = MakeCode(20);
   
    // creating a team 
    const joinedTime = new Date();
    const teamStanding = await Teams.find().count() + 1;
    const {expects:userExpects} = await Expects.findOne({userName});
    const userExpects4Team = Filter_User_Expects_4Team(userExpects,joinedTime)
    
    const team = new Teams({
        teamName ,
        teamCode,
        teamMembers : [{
            userName : user.userName,
            expects:userExpects4Team,
            joinedTime,
            sharePoints:0
        }],
        teamStanding,
    })
 
    // saving a team
    await team.save(()=>{
        console.log("team is created succ");
    });

    user.team = team;
    await User.updateOne({userName},user);
    
    // sending the teamCode back to the client so he can invite his friends
    const data = JSON.stringify({
            teamCode,
            msg: "Created Successfully",
            team
        });
    
    res.status(201).send(data);


})


team.put('/jointeam',joinTeamValidation,async(req,res)=>{
    const { user, team, teamCode, userName } = req.body;
    const joinedTime = new Date();
    const {expects : userExpects} =  await Expects.findOne({userName:user.userName});
    //filter Expects 
    const user_Expects_To_Team = Filter_User_Expects_4Team(userExpects,joinedTime);

    team.teamMembers.push({
        userName : user.userName,
        joinedTime,
        expects : user_Expects_To_Team,
        sharePoints:0
    });
    user.team = team;

    await Teams.updateOne({teamCode}, team);
    await User.updateOne({userName}, user);

    res.status(200).send({team,msg : "Joined Successfully"});
})


// i expect sending from front end username of the leaving user. 
team.put('/leaveteam',async(req,res)=>{
    
    const {userName} = req.body; 
    let user = await User.findOne({userName});
    if(!user.team) 
        return res.status(400).send("You are not in a team!");
    
    try{
        let team = await Teams.findOne({teamName : user.team.teamName});
        // if the user was the last one we will delete the team. 
        if(team.teamMembers.length === 1) {
            await Teams.deleteOne({teamName : team.teamName});
            user.team = null ;
            await User.updateOne({userName},user);
            res.status(200).send("done");
        }
        else{
            // so we filter out the speceific team member. 
            team.teamMembers = team.teamMembers.filter((member)=> {
                if(member.userName !== userName)
                    return member;
                else {
                    // so this member will be removed, but his share points will stays with the team.
                    team.leftPoints += member.sharePoints;
                }
            });
            // so we make it null since he left the team.
            user.team = null ;
            await User.updateOne({userName},user);
            await Teams.updateOne({teamName : team.teamName},team);
            res.status(200).send(team);
        }
    }
    catch(err){
        console.log(err);
    }
        })





// this route is for myteam Component
team.get('/myteam/:userName',async(req,res)=>{
    const {userName} = req.params;
    try{
        const user = await User.findOne({userName});
        if(!user)
            return res.status(404).send("this user is not found");
        if(!user.team)
            return res.status(200).send(null);

        let team = await Teams.findOne({teamName : user.team.teamName});
        const {expects} = team.teamMembers.find(member=>member.userName === userName);
        
        const {totalTeamPoints} = await CalculateTotalTeamPoints(team);
        
        await SortingTeams();
        res.status(200).send({team ,expects,totalTeamPoints}); 
    }
    catch(err){
        console.log(err);
    }
})



team.get('/teamstanding',async(req,res)=>{ 
    const {limit} = req.query;
    let SortedTeams = await Teams.find().sort({teamsPoints :  -1}).limit(limit);
   
    SortedTeams = SortedTeams.map(team =>  {
        let filter = {teamName:team.teamName , points:team.teamPoints,noMembers:team.teamMembers.length}
        return filter;
    } )
    res.send(SortedTeams)
})


team.get('/sort',async(req,res)=>{
    //this function will sort the team and updarte the database.
    await SortingTeams();
    res.send("done")
})

export default team;