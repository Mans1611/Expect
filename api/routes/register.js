
import jwt from 'jsonwebtoken';
import  express,{Router} from 'express'
import  User  from '../models/User.js';
import verify  from '../middleware/verifyJWT.js';
import mailVerification from '../maller/mailVerification.js'; 
import Token  from '../models/Token.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Expects from '../models/Expects.js';
import CreateUserSession from '../middleware/createUSerSession.js';
import mongoose from 'mongoose';
import session from '../models/users_session.js';
import MakeCode from './utilis/RandomChar.js';
import crypto from 'crypto';


dotenv.config();

const router = express.Router();





router.post('/signup',async(req,res)=>{
    try{
    const {userName,password,phoneNumber,email,userCountry,device} = req.body;

    // since the phone number is optional not required so i will check the phone number first then i will find if it repetative.
    if(phoneNumber){
        const existUser = await User.findOne({phoneNumber});
        if(existUser)
            return res.status(203).json({msg:"this phone number is being added before"});  
    }
    let existUser = await User.findOne({userName})
    if(existUser)
        return res.status(203).json({msg:"This userName is already exist"});
    
        existUser = await User.findOne({email})
    if(existUser)
        return res.status(203).json({msg:"This email is already exist"});

    const genSalt = await bcrypt.genSalt(parseInt(process.env.SALT));
    const hashed = await bcrypt.hash(password,genSalt);
    const userStanding = await User.find().count() + 1;
    // const msg = `hello expecter ${userName}`;
    // await mailVerification(email,msg);
    const token = jwt.sign({userName,email},process.env.JWT);
    
    const user =  new User({
        userName,password:hashed,phoneNumber,email,userCountry,userStanding,token
    });

    const expects = new Expects({userName})// creating a new expect documentation 
    await expects.save(()=>{
    })

    const session_id = crypto.randomBytes(30).toString('hex');
            
            const user_session = new session({
                user : userName,
                session_id,
                device
            });

    await user.save();

    res.status(201).json({
        msg:"User is created succussfully",
        token,
        session_id,
        user : {userName,goldenPlayer:{player : null , updateCounter : 1}} //  as in the database, i just send it back to the fron end.
        
    });

    await user_session.save();

    
}
    catch(err){
        console.log(err);
    }

})



router.post('/login',async(req,res)=>{
    const {userName,password,device} = req.body;
    try{
        const userDB = await User.findOne({userName});
        if(!userDB)
            return res.status(203).json({msg:"Check your Username and password"});
        const checkPass = await bcrypt.compare(password,userDB.password);
        if(checkPass){
            // create new token for the user 
            const token = jwt.sign({userName},process.env.JWT,{
                expiresIn : 60 * 60 * 1000 // one hour
            });  
            // creating a session to that user
            
          
            // req.session.user = {
            //     isAdmin : false,
            //     userName: req.body.userName,     
            // };
            const session_id = crypto.randomBytes(30).toString('hex');
            
            const user_session = new session({
                user : userName,
                session_id,
                device
            });
            await user_session.save();

            return res.status(200).json({
                msg:"login successfully",
                token,
                session_id,
                user : {userName:userDB.userName, goldenPlayer : userDB.goldenPlayer}

        });
        }
        res.status(203).json({msg:"Check your Username and password"}); 
    }catch(err){
        console.log(err)
        res.status(402).json({msg:err}); 
    }
})

router.post('/verifysession',async(req,res)=>{
    let  {session_id} = req.body;

    const Session = await session.findOne({session_id});
    if(!Session)
        return res.status(404).json({msg : "session had endded"});

    return res.status(200).json({userName : Session.user,session_id})

    
    
})


router.get('/verifySession/:token',async(req,res)=>{
    if(!req.params.token)
        return  res.status(203).json({msg:"token is not defined"});
    const verifyToken = await jwt.decode(req.params.token,process.env.JWT);
    res.status(200).json({payload:verifyToken});
})

router.delete('/logout',async(req,res)=>{
    const {userName} = req.body;
    await session.findOneAndDelete({userName});
    return res.status(200).json({msg:'done'})
})


router.put('/:id',verify,async (req,res) =>{
    const {id,phonenumber} = req.user;
    if(id !== req.params.id)
        return res.status(401).json({msg:"token conflict"})
        if(req.body.phonenumber)
            req.body.phonenumber = "+974" + req.body.phonenumber;
        if(req.body.pw1){
            const salt = await bcrypt.genSalt(10)
            const pass = await bcrypt.hash(req.body.pw1,salt);
            req.body.pw1 = pass;
        }
    await User.findOneAndUpdate({id},{$set:req.body},{new:true});
    res.status(200).json({msg:"done"})

});

router.get('/verify/:id/:token',async (req,res)=>{
    const {id, token} = req.params;
    try{
        const tokenDB = await Token.findById(id);
        const user = await User.findById(id);
        if(!tokenDB)
            return res.status(404).json({msg:"the email is verified"});
        if(!user)
            return res.status(404).json({msg:"this user is not found"})
            
        await User.findByIdAndUpdate(id,{isVerified:true});
        await Token.findByIdAndDelete(id);
        res.status(201).send("verified");
    }catch(err){
        res.status(402).send(err);
    }
})

router.get('/states',async (req,res)=>{
     const today = new Date();
     const lastYear = today.setFullYear(today.setFullYear() - 1);
     try{
        const data = await User.aggregate([
            {

            
            $project:{
                month:{$month:"$createdAt"},
            },
            
        },{
            $group:{
                _id:"$month",
                total:{$sum:1},
            },
        },
        ])
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get('/find/random',async (req,res)=>{
    const {random} = req.query;
    let data;
    if(random === "verifed"){
        data = await User.aggregate([
            {$match:{isVerified:true}},
            {$sample:{size:1}}
        ]) 
    }
    else{
        data = await User.aggregate([
            {$match:{isVerified:false}},
            {$sample:{size:1}}
        ])
    }
    res.status(200).send(data);
})

router.delete('/:id',async(req,res)=>{
    try{
    const user = await User.findById(req.params.id)
    if(!user)
        return res.status(404).send("this user is not found")
        await User.findByIdAndDelete(req.params.id)
        res.json('user is being deleted')
    }catch(err){
        res.status(401).send(err);
    }
}) 

export default router;
