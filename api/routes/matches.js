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

matches.get('/match/:id', async (req,res)=>{
    try{
        const match = await Matches.findOne({matchId:req.params.id});
        res.status(200).json({data:match});
    }
    catch(err){
        console.log(err);

    }
 })
matches.get('/match/',async(req,res)=>{
    try{
        const dontMissMatches = await Matches.find({fullTime : req.query.fullTime}).limit(2);
        console.log("wow");
        res.status(200).send(dontMissMatches);
    }catch(err){
        console.log(err);

    }

})


matches.post('/addgame', async(req,res)=>{
    const {firstCountry,secondCountry} = req.body;
    const votes = 0;
    
    /* 
        in this code we just assign to zero  votes varibale to each player 
        in the beginning of each match in order to make calculation based
        on distrubuation 
    */
    const {players:players_1} = firstCountry;
    const {players:players_2} = secondCountry;
    const result = 0;

    const newPlayers_1 = [],newPlayers_2 = [];
    const length = (players_1.length>players_2.length)? players_1.length : players_2.length;
    
    // the two arrays may vary in length, hence i implement id condition in each loop 
    for(let i = 0; i<length; i++){
        if(players_1[i]){
            const {playerName,position,playerImg} = players_1[i]
            const newObj = {playerName,position,playerImg,votes,playerPoints: 0};

            newPlayers_1.push(newObj);
        }
        if(players_2[i]){
           const {playerName,position,playerImg} = players_2[i]
            const newObj = {playerName,position,playerImg,votes,playerPoints: 0};
    
            newPlayers_2.push(newObj)
        }
    }
    firstCountry.players = newPlayers_1;
    secondCountry.players = newPlayers_2;
    firstCountry.result = 0;
    secondCountry.result = 0;

    const match = await new Matches ({
        firstCountry,
        secondCountry,
        ...req.body
    }
    );

    console.log(match.firstCountry);
    match.save(()=>{
        console.log("match is added");
    })
    res.status(201).json({msg:"Match is added"});
    
})

matches.put('/editmatch/:matchID',async (req,res)=>{
   
    
    const fullTime = req.body.fullTime ? req.body.fullTime : false;
    
    console.log("why is "+fullTime);

    const updatedMatch = await Matches.findOneAndUpdate({matchId:req.params.matchID},
        {
            $set : {
                'firstCountry.result':req.body.result1, // this to access the inner property
                'secondCountry.result' : req.body.result2,
                fullTime
            },
            
        })
        
    
        
    res.status(200).json({msg:"Done Updating",updatedMatch})
})


matches.delete('/deletematch/:matchID',async (req,res)=>{
    console.log("passes");
   try{
        const match = await Matches.findOne({matchId:req.params.matchID});
        if(!match)
            return res.status(203).json({msg:`This Match_id ${req.params.matchID} is not exist to delete`})     
        await Matches.deleteOne({matchId : req.params.matchID});
        res.status(200).json({msg:"this match is deleted successfuly"});
   
    }
   catch(err){
    console.log(err);
   }
})


export default matches;