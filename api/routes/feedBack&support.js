import express , {Router} from "express";
import feedBack from "../models/Feedback&Support.js";
import verifyAdmin from '../middleware/verifyAdmin.js';
import User from "../models/User.js";


const feedback = express.Router();



feedback.get('/getfeedbacks',verifyAdmin,async(req,res)=>{
    try{
        const feedbacks = await feedBack.find({helpSupport : false }); // as i want just the feed back not the the problems .
        res.status(200).json({feedbacks});
    }catch(err){
        console.log(err);
    }
    
})

feedback.get('/getSupport',verifyAdmin,async(req,res)=>{
    try{
        const feedbacks = await feedBack.find({helpSupport :  true}); // as i want just the feed back not the the problems .
        res.status(200).json({feedbacks});
    }catch(err){
        console.log(err);
    }
    
})

feedback.get('/getSupport/:problemType',verifyAdmin,async(req,res)=>{
    const {problemType} = req.params;

    try{
        const feedbacks = await feedBack.find({problemType}); // as i want just the feed back not the the problems .
        res.status(200).json({feedbacks});
    }catch(err){
        console.log(err);
    }
    
})
// this get methode is just to check if the user who send support feedback is exist or not. 
feedback.post('/checkEmail',verifyAdmin,async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email});

        if(user)
            return res.status(200).json({msg : "This User is exist"});
        else{
            return res.status(404).json({msg : "This user email is not found"});
        }
    }catch(err){
        console.log(err);
    }
    
})




feedback.post('/postfeedback',async(req,res)=>{
    try{
        console.log(req.body);
        const feedback = new feedBack(req.body);
        await feedback.save();
        res.status(200).json({msg : "feed back is sucussfully saved"});

    }catch(err){
        console.log(err);
    }
})







export default feedback;
