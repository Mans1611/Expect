import express, { Router }  from "express";
import News from "../models/News.js";
import mongoose from "mongoose";
import SessionVerification from "../middleware/sessionVerify.js";
//import { client } from "../index.js";
const news = express.Router();


news.get('/getnews',async(req,res)=>{
    try{
        //const cahchedNews = await client.get('allNews');
        // if(cahchedNews)
        //     return res.status(200).send(JSON.parse(cahchedNews).reverse().slice(0,3))
        const allNews = await News.find();
        res.status(200).send(allNews.reverse().slice(0,3)) // to send the updated matches since the newest will be the downward
        // await client.set('allNews',JSON.stringify(allNews)); // we cache the news .
        // else{

        // }

    }catch(err){
        console.log(err);
    }
})

news.get('/getCountryNews/:countryName',async(req,res)=>{
    let pushNews = [];
    const {countryName} = req.params;
    const regExp = new RegExp(`${countryName}`,'ig');
    const New = await News.find({tags : regExp});
    pushNews.push(...New);

    if(pushNews.length<=2){
        const all_news = await News.find();
        for(let news of all_news){
            if(!news.tags.includes(countryName))
                pushNews.push(news);
            
            if(pushNews.length >= 3)
            break
        }
    }
    res.status(200).json(pushNews);


})

news.post('/addnews',async(req,res)=>{
    try{
        const news = await News({
            ...req.body
        });
        await news.save()
        res.status(201).send("news is saved");
        const allNews = await News.find();
        //await client.set('allNews',JOSN.stringify(allNews.reverse().slice(0,3)));
        
    }
    catch(err){
        console.log(err);
    }
})





export default news;