import express, { Router }  from "express";
import News from "../models/News.js";
import mongoose from "mongoose";
const news = express.Router();


news.get('/getnews',async(req,res)=>{
    try{
        const allNews = await News.find();

        res.status(200).send(allNews.reverse().slice(0,3))
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