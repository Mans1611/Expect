import express from 'express';
import verify from '../middleware/verify.js';
import User from '../models/User.js';
import Expects from '../models/Expects.js';

import { Users } from './ClassHandlers/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const users = express.Router();

users.get('/standing',verify,async(req,res)=>{
    const limit = req.query.limit || 3;
    const users = await User.find().sort({userPoints : -1}).limit(limit);
    if(users.length>0){
        return res.status(200).json(users);
    }
    res.status(203).json({msg:"No users yet"})
})
users.get("/profile/:userName",async(req,res)=>{
    try{
        const user = await User.find({userName:req.params.userName})
        res.status(200).send(user);
    }catch(err){
        console.log(err);
    }
})

users.put('/edituser/:userName', async(req,res)=>{
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
        if(Updated_Data.userName){
            const already_Exist_User = await User.findOne({userName:Updated_Data.userName});
            if(already_Exist_User)
                return res.status(203).send("This Username Is Already Exist");
            // to update the Expect model as well.
            await Expects.updateOne({userName : req.params.userName},{
                userName : Updated_Data.userName
            })
            token = await jwt.sign({userName : Updated_Data.userName},process.env.JWT);

         }

    await User.updateOne({userName : req.params.userName},Updated_Data);
    res.status(201).setHeader('token',token).json({userName:Updated_Data.userName, msg : "Successfully Updating"});

})

export default users;