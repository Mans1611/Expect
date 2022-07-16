import express from 'express';
import verify from '../middleware/verify.js';
import User from '../models/User.js';
const users = express.Router();

users.get('/standing',verify,async(req,res)=>{
    const limit = req.query.limit || 3;
    const users = await User.find().limit(limit);
    if(users.length>0){
        return res.status(200).json(users);
    }
    res.status(203).json({msg:"No users yet"})
})

export default users;