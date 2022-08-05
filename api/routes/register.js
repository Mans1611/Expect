
import jwt from 'jsonwebtoken';
import  express,{Router} from 'express'
import  User  from '../models/User.js';
import verify  from '../middleware/verify.js';
import mailVerification from '../maller/mailVerification.js'; 
import Token  from '../models/Token.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Expects from '../models/Expects.js';
import CreateUserSession from '../middleware/createUSerSession.js';
dotenv.config();

const router = express.Router();






router.post('/signup',async(req,res)=>{
    try{
    const {userName,password,phoneNumber,email,userCountry} = req.body;

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

    const user = await new User({
        userName,password:hashed,phoneNumber,email,userCountry
    });
    const msg = `hello expecter ${userName}`;
    await mailVerification(email,msg);
    const token = jwt.sign({userName,email},process.env.JWT);
    
    const expects = new Expects({userName})// creating a new expect documentation 
    await expects.save(()=>{
    })
    CreateUserSession(req);

    await user.save(()=>{
        res.status(201).json({
            msg:"User is created succussfully",

        
        });
    })
    
}
    catch(err){
        console.log(err);
    }

})



router.post('/login',async(req,res)=>{
    const {userName,password} = req.body;
    
    try{
        const userDB = await User.findOne({userName});

        if(!userDB)
            return res.status(203).json({msg:"this user is not found in database"});
        const checkPass = await bcrypt.compare(password,userDB.password);
        if(checkPass){
            const token = jwt.sign({userName},process.env.JWT);  
            // creating a session to that user
            CreateUserSession(req)
            return res.status(200).json({msg:"login successfully",token});
        }
        res.status(203).json({msg:"The Passowrd is incorrect"}); 
    }catch(err){
        res.status(402).json({msg:err}); 
    }
})



router.get('/verifySession/:token',async(req,res)=>{
    if(!req.params.token)
        return  res.status(203).json({msg:"token is not defined"});
    const verifyToken = await jwt.decode(req.params.token,process.env.JWT);
    res.status(200).json({payload:verifyToken});
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
