import express from "express"
import Admin from "../models/Admin.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const admin = express.Router()


// signup route
admin.post('/signup',async(req,res)=>{
    const {userName,password,adminKey} = req.body;

    const existAdmin = await Admin.findOne({userName});
    if(existAdmin)
        return res.status(203).send("This Username Is Already Exist");
    
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
    const hashedPass = await bcrypt.hash(password,salt);
    if(process.env.adminKey !== adminKey)
    return res.status(203).send("You are not allowed to enter this page");
    
    const token = jwt.sign({userName,isAdmin : true} , process.env.JWT);
    console.log(token);
    const userAdmin = new Admin({
        userName,
        password : hashedPass,
    }) 

    await userAdmin.save(()=>{
        console.log("user Is saved");
    });
    res.status(201).setHeader("token",token).send("done user is created")
})


admin.post('/login',async(req,res)=>{
    const {userName,password,adminKey} = req.body;
    const adminUser = await Admin.findOne({userName});
    if(!adminUser) 
        return res.status(203).send("This Account Is Not Exist");
    const match = await bcrypt.compare(password,adminUser.password);
    if(!match)
        return res.status(203).send("The Password Is Incorrect");
    if(adminKey !== process.env.adminKey)
        return res.status(203).send("The Admin Key IS Invalid");
    
    res.status(200).send("Login Successfully")
    
})


export default admin;