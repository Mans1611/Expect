import express, { Router }  from "express";
import News from "../models/News.js";
import mongoose from "mongoose";
const news = express.Router();


news.get('/getnews',async(req,res)=>{
    try{
        const news = await News.find().limit(3);
        res.status(200).send(news)
    }catch(err){
        console.log(err);
    }
})


news.post('/addnews',async(req,res)=>{
    const {title,img,paragraph} = req.body;
    try{
        const news = await News({
            title,
            img,
            paragraph
        });
        await news.save()
        res.status(201).send("news is saved")
    }
    catch(err){
        console.log(err);
    }
})





export default news;