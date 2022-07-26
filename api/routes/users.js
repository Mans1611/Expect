import express from 'express';
import verify from '../middleware/verify.js';
import User from '../models/User.js';
import { Users } from './ClassHandlers/User.js';
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
export default users;