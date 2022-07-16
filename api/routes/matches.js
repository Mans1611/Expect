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
    const {firstCountry,secondCountry} = req.body;
    const votes = 0;
    
    /* 
        in this code we just assign to zero  votes varibale to each player 
        in the beginning of each match in order to make calculation based
        on distrubuation 
    */
    const {players:players_1} = firstCountry;
    const {players:players_2} = secondCountry;

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


    const match = await new Matches ({
        firstCountry,
        secondCountry,
        ...req.body
    }
    );

    console.log(match);
    match.save(()=>{
        console.log("match is added");
    })
    res.status(201).json({msg:"Match is added"});
    
})

matches.put('/editgame/:id',(req,res)=>{
   
   
})

matches.delete("/deletelastgames",(req,res)=>{
   
})


export default matches;