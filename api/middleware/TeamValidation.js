import  Express  from "express";
import Teams from "../models/Teams.js";
import User from "../models/User.js";

const TeamValidation = async (req,res,next)=>{
    
    req.body = JSON.parse(req.body.body);
    
    const existTeam = await Teams.findOne({teamName : req.body.teamName});
    
    // if(existTeam)
    //     return res.status(203).send("This team already exist")


    const user = await User.findOne({userName : req.body.userName});
    
    // if(user.team) 
    //     return res.status(203).send("You Already exist in a team");
    
    req.body.user = user; 
    next();
}


export default TeamValidation;


