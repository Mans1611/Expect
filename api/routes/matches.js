import express , {Router} from 'express'
import Country from '../models/Country.js';
import Matches from '../models/Matches.js';

const matches = express.Router();
matches.get('/getmatches',async(req,res)=>{
    try{
        const matches = await Matches.find();
        res.status(200).send(matches);
    }catch(err){
        console.log(err);
    }

})

// router.get('/match/:id',(req,res)=>{
    
// })



matches.post('/addgame', async(req,res)=>{
    let {country1,country2,time,id} = req.body;
    country1 = await Country.findOne({country:country1});
    country2 = await Country.findOne({country:country2});
    const match = await new Mathces ({
        country1,
        country2,
        time,
        id
    })
    match.save(()=>{
        console.log("match is added");
    })
    res.send(match);
    
})

matches.put('/editgame/:id',(req,res)=>{
   
   
})

matches.delete("/deletelastgames",(req,res)=>{
   
})


export default matches;