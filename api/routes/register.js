
import jwt from 'jsonwebtoken';
import  express,{Router} from 'express'
import crypto from ('crypto')
import  User  from ('../models/User.js');
import verify  from ('../middleware/verify.js');
import mailVerification from '../maller/mailVerification.js'; 
import Token  from ('../models/Token.js');
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
router.get('/users',async(req,res)=>{
    User.find() 
    .then(user=>res.json(user))
    .catch(err=>res.status(404).json('error' + err)); 
})

router.post('/signup', async(req,res)=>{ 
    try{
        let existUser = false;
        const {username,email,phonenumber,pw1,country} = req.body;
        let point = 0 ;
        const newNumber = '+974' + phonenumber;
        
        //const salt = await  bcrypt.genSalt(8);
        //const hashed = await bcrypt.hash(pw1,salt);
        //const token = jwt.sign({username,email},process.env.PK,{expiresIn:'5d'});
        res.header('Access-Control-Allow-Origin', '*');
        const newUser = await new User({
            username,
            email,
            phonenumber:newNumber,
            pw1,
            point,
            country,
        });
        const emailToken = crypto.randomBytes(32).toString('hex'); 
        const {id} = newUser;
        await new Token({ _id : id}).save();
        const link = `http://localhost:5000/verify/${id}/${emailToken}`;
        //console.log(email,link);
        await mailVerification(email,link);

        await newUser.save(()=>{
            console.log("done");
            res.header('x-auth-token' , "mans").json("user is added succssuflly")
        })
        
     }
     catch(err){
         console.log("second cathch");
         res.status(401).send(err);
        }
        })



app.post('/signup', async(req,res)=>{ 
    try{
        let existUser = false;
        const {username,email,phonenumber,pw1,country} = req.body;
        console.log("-".repeat(20));
        let point = 0 ;
        const newNumber = '+974' + phonenumber;
        console.log(newNumber);

        const encryptedPassword = encryptPassword(pw1,"mans");
        console.log(encryptedPassword);
        const newUser = await new User({
            username,
            email,
            phonenumber:newNumber,
            pw1:encryptedPassword,
            point,
            country,
        });
        const emailToken = crypto.randomBytes(32).toString('hex'); 
        //console.log("token:" +emailToken);
        const {id} = newUser;

        console.log("id : " + id);
        //await new Token({ _id : id}).save();
        const link = `http://localhost:8000/verify/${id}/${emailToken}`;
        console.log(link);
        await mailVerification(email,link);

        await newUser.save(()=>{
            res.header('x-auth-token' , "mans").json("user is added succssuflly")
        })  
        }
        catch(err){
            console.log(err);
        }

})   
            

router.get('/find/all',verify,async(req,res)=>{
    const {last}= req.query;
    const {id} = req.user;
    const user = await User.findById(id);
    if(!user.isAdmin)
        return res.status(401).send("you are not authnticated");
    
    const users = last? await User.find().sort({_id:-1}).limit(2):await User.find();
    res.status(200).send(users);

})


router.post('/login',async(req,res)=>{
    const {phonenumber,pw1} = req.body;
    const newPhone = "+974" + phonenumber;
    try{
        const checkUser = await User.findOne({phonenumber:newPhone});
        if(!checkUser)
            return res.status(404).send("this user is not found in database");
        const checkPass = await bcrypt.compare(pw1,checkUser.pw1);
        if(checkUser&&checkPass)
            return res.status(200).send("login successfully");
        res.status(400).send("check the phone number or your password"); 
    }catch(err){
        res.status(402).json({msg:err}); 
    }
})
router.put('/:id',verify,async (req,res) =>{
    const {id,phonenumber} = req.user;
    //console.log(id,req.params.id);
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
    const user = await User.findById(req.params.id)
    if(!user)
        return res.status(404).send("this user is not found")
    try{
        await User.findByIdAndDelete(req.params.id)
        res.json('user is being deleted')
    }catch(err){
        res.status(401).send(err);
    }
}) 

export default router;
