import express from 'express';
import verifyJWT from '../middleware/verifyJWT.js';
import User from '../models/User.js';
import Expects from '../models/Expects.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Country from '../models/Country.js';
import verifyAdmin from '../middleware/verifyAdmin.js';
import VerifyUserJWT from '../middleware/VerifyUserJWT.js';
import Teams from '../models/Teams.js';
const users = express.Router();

users.get('/standing',async(req,res)=>{
    const limit = req.query.limit || 5;
    
    const users = await User.find().sort({userPoints : -1}).limit(limit);
    if(users.length>0){
        return res.status(200).json(users);
    }
    res.status(203).json({msg:"No users yet"})
})

// this for admins 
users.get('/standingforAdmins',verifyAdmin,async(req,res)=>{
    
    const {start,end} = req.query;
    if(start == 1){
        const users = await User.find().sort({userPoints : -1}).limit(1);
        if(users.length>0){
            return res.status(200).json(users);
        }
    }else{
        const users = await User.find().sort({userPoints : -1}).skip(start-1).limit(1);
        return res.status(200).json(users);
    }
    
    res.status(203).json({msg:"No users yet"})
})

users.get("/profile/:userName",async(req,res)=>{
    const {userName} = req.params;
    try{
        let USER = await User.aggregate([
            {$match : {"userName" :userName }},
            {$lookup:{
                from : "countries",
                localField : "userCountry",
                foreignField : "countryName",
                as : "countries"
            }},
            {$project : {"countries.players" : 0,password:0,isAdmin : 0 ,_id: 0}},
            {$unwind : "$countries"}
        ])
        const {expects} = await Expects.findOne({userName})
        USER.push(expects.length);
        res.status(200).send(USER);
    }catch(err){
        console.log(err);
    }
})

users.put('/edituser/:userName',VerifyUserJWT, async(req,res)=>{
    let Updated_Data = JSON.parse(req.body.payload); 
    let user = await User.findOne({userName : req.params.userName});
    let token = req.headers.token;
    if(!token)
        res.status(203).send("token is not provided");
            
        
    const tokenPayload = await jwt.verify(token,process.env.JWT);
    if(tokenPayload.userName !== user.userName) // this if the userName in token from the client do not match with the username in the DB
        return res.status(204).send("This is not your email");    

        if(Updated_Data.phoneNumber){
            // already_Exist_User is to check if the new data is matching with any unique data in the databse.
            const already_Exist_User = await User.findOne({phoneNumber:Updated_Data.phoneNumber});
            if(already_Exist_User && user.phoneNumber !== Updated_Data.phoneNumber)
            return res.status(203).send("This Phone Number Is Already Exist");
        }
        if(Updated_Data.email){
            // already_Exist_User is to check if the new data is matching with any unique data in the databse.
            const already_Exist_User = await User.findOne({email:Updated_Data.email});
            if(already_Exist_User && user.email !== Updated_Data.email)
            return res.status(203).send("This Email Is Already Exist");
        }
        
        if(Updated_Data.oldPass){
            // to ensure the old passwprd.
            const checkPass = await bcrypt.compare(Updated_Data.oldPass,user.password);
            if(!checkPass)
            return res.status(203).send("Wrong password");
            const new_encryptedPass = await bcrypt.hash(Updated_Data.password,parseInt(process.env.SALT));
            Updated_Data.password = new_encryptedPass;
        }
        // for updating userName we need tu udate the userName also in the Team Collection.
        if(Updated_Data.userName){
            const already_Exist_User = await User.findOne({userName:Updated_Data.userName});
            if(already_Exist_User)
            return res.status(203).send("This Username Is Already Exist");
            // to update the Expect collection as well.
            if(user.team){
                let team = await Teams.findOne({teamName : user.team.teamName });
                for(let i = 0 ; i < team.teamMembers.length;i++){
                    if(team.teamMembers[i].userName === req.params.userName){
                        team.teamMembers[i].userName = Updated_Data.userName;
                        break;
                    }
                }
                await Teams.updateOne({teamName : user.team.teamName} , team);
            }
            await Expects.updateOne({userName : req.params.userName},{
                userName : Updated_Data.userName
            })
            token = await jwt.sign({userName : Updated_Data.userName},process.env.JWT);

         }

    await User.updateOne({userName : req.params.userName},Updated_Data);
    res.status(201).setHeader('token',token).json({userName:Updated_Data.userName, msg : "Successfully Updating"});

})



export default users;