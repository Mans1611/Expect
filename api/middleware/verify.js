import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const verify = async(req,res,next)=>{
    const token = req.header('token');
    if(!token)
        return res.status(404).json({msg:"token is not found"});
    try{
        jwt.verify(token,process.env.JWT,(err,user)=>{
            if(err)
                return res.status(401).json({msg:"token is not valid"});
            req.user = user;
            next()
        });
        
    }catch(err){
        res.status(404).json({msg:err});
    }
}

export default verify;