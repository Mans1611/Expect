import express from 'express';
import TeamValidation from '../middleware/TeamValidation.js';
import crypto from 'crypto' ; 
import MakeCode from './utilis/RandomChar.js';
import Teams from '../models/Teams.js';
import User from '../models/User.js';

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




export default team;