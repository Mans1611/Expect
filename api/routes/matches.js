import express , {Router} from 'express'
import Country from '../models/Country.js';
import Matches from '../models/Matches.js';
import addingPointsPlayer from './utilis/addingPointsPlayers.js';
import TransferingPointsToCountry from './utilis/TransferingPointsToCountry.js';
import SessionVerification from "../middleware/sessionVerify.js";



const matches = express.Router();

matches.get('/getmatches',SessionVerification,async(req,res)=>{
    try{
        
        const matches = await Matches.find().sort({matchTime : 1}); // so we sort it asc
        res.status(200).send(matches);
       
    }catch(err){
        console.log(err);
    }

})
// matches.get('/',async(req,res)=>{
//     const {round} = req.query;
//     const roundMatches = await Matches.find({round});
//     res.send(roundMatches);
// })
matches.get('/match/:id', async (req,res)=>{
    try{
        const match = await Matches.findOne({matchId:req.params.id});
        res.status(200).json({data:match});
    }
    catch(err){
        console.log(err);

    }
 })

 // in this route we can get the information by just the date of this day 
 matches.get('/', async (req,res)=>{
    try{
        const {round,date} = req.query;
        if(round){
            const roundMatches = await Matches.find({round});
            return res.status(200).send(roundMatches);
        }
        else if(!round && date){
            const regEX = new RegExp(`${req.query.date}`,'ig'); // use regular expression to just find all matches with this date no matter the time
            const match = await Matches.find({matchTime: regEX });
            return res.status(200).send(match);
        }
    }
    catch(err){
        console.log(err);

    }
 })

// for full time matches query 
matches.get('/match/',SessionVerification,async(req,res)=>{
    try{
        
        const dontMissMatches = await Matches.find({fullTime : req.query.fullTime}).limit(2);
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
    
    // to take the length of the longest array.
    const length = (players_1.length>players_2.length)? players_1.length : players_2.length;
    // so the match Id is unique for every match . 
    const matchId = firstCountry.countryName.slice(0,3).toUpperCase()+ "-"+
                    secondCountry.countryName.slice(0,3).toUpperCase()+ "-"+
                    req.body.round.split(" ")[0];

    
    const existMatch = await Matches.findOne({matchId})
    if(existMatch)
        res.status(203).send("This Match Is Already Exist")
        
    // the two arrays may vary in length, hence i implement id condition in each loop 
    for(let i = 0; i<length; i++){
        if(players_1[i]){
            const {playerName,position,playerImg} = players_1[i]
            const newObj = {
                playerName,
                position,
                playerImg,
                votes,
                playerPoints: 0
            };
            newPlayers_1.push(newObj);
        }
        if(players_2[i]){
           const {playerName,position,playerImg} = players_2[i]
            const newObj = {playerName,position,playerImg,votes,playerPoints: 0};
            newPlayers_2.push(newObj)
        }
    }
    
                    
    try{
        firstCountry.players = newPlayers_1;
        secondCountry.players = newPlayers_2;
        firstCountry.result = 0;
        secondCountry.result = 0;

        const match = await new Matches ({
            firstCountry,
            secondCountry,
            matchId,
            ...req.body
        }
        );
    
         match.save(()=>{
            console.log("match is added");
        })
        res.status(201).json({msg:"Match is added"});

    }catch(err){
        console.log(err);
    }
    
})

matches.put('/editmatch/:matchID',async (req,res)=>{
    try{

        let match = await Matches.findOne({matchId:req.params.matchID});
        
        const {updatedPlayer_1,updatedPlayer_2} = req.body;
        if(!match){
            return res.status(203).send("this Match is not found");
        }
        match.firstCountry.result = req.body.result1 ? req.body.result1 : match.firstCountry.result ;
        match.secondCountry.result = req.body.result2 ? req.body.result2 : match.secondCountry.result ;
        match.nextStatue = req.body.nextStatue ? req.body.nextStatue : match.nextStatue;
        match.matchStatue = req.body.matchStatue ? req.body.matchStatue : match.matchStatue;
        match.stoppingTime = req.body.stoppingTime ? req.body.stoppingTime : match.stoppingTime;

        const fullTime = req.body.fullTime ? req.body.fullTime : false;
        match.fullTime = fullTime;

        // skip t it it is empty or undefined
        if(updatedPlayer_1){
            match = await addingPointsPlayer(updatedPlayer_1,match.firstCountry.countryName,match);
            match.states.push(updatedPlayer_1);
        }
        if(updatedPlayer_2){
            match = await addingPointsPlayer(updatedPlayer_2,match.secondCountry.countryName,match);
            match.states.push(updatedPlayer_2);
        }

        match.started = req.body.started ? req.body.started : match.started;
        
        await Matches.updateOne({matchId:req.params.matchID},match) 
        return res.status(200).send("done");
    }
    catch(err){
        console.log(err);
    }
})
matches.put('/updatestate/:matchId/:stateIndex',async(req,res)=>{
    const {matchId,stateIndex} = req.params;
    try{
        console.log(stateIndex);
        let match = await Matches.findOne({matchId});
        
        const playerDetails = match.states[stateIndex]; // an object has min playerName countryOrder, index.

        if(playerDetails.country === 'second'){
            // the internal inline condition is for the negative sign, so i take the first number after ( and then check if it is a negative or not 
            const points = parseInt(playerDetails.state.split('(')[1][0] === '-' ? `-${playerDetails.state.split('(')[1][1]}` : playerDetails.state.split('(')[1][0]); // this is just to get the points from state Ex :  Score a goal (4PTS);
             match.secondCountry.players[playerDetails.index].playerPoints -= points;
        }else {
            const points = parseInt(playerDetails.state.split('(')[1][0] === '-' ? `-${playerDetails.state.split('(')[1][1]}` : playerDetails.state.split('(')[1][0]); // this is just to get the points from state Ex :  Score a goal (4PTS);
            match.firstCountry.players[playerDetails.index].playerPoints -= points;
        }
       
        match.states = match.states.filter((_state,index)=> index != stateIndex);
        await Matches.updateOne({matchId},match)
        res.status(200).send(match)
    }catch(err){
        console.log(err);
    }
})

matches.put('/fullTime/:matchId',async(req,res)=>{
    try{
        let match = await Matches.findOne({matchId:req.params.matchId});
        match.fullTime = true;
        // to permentlay save the final points to the players in the country midel 
        
    }
    
    catch(err){

    }

})


matches.delete('/deletematch/:matchID',async (req,res)=>{
    
   try{
        const match = await Matches.findOne({matchId:req.params.matchID});
        if(!match)
            return res.status(203).json({msg:`This Match_id ${req.params.matchID} is not exist to delete`})     
        await Matches.deleteOne({matchId : req.params.matchID});
        const matches = await Matches.find();
        res.status(200).json({msg:"this match is deleted successfuly",newMatches:matches});
   
    }
   catch(err){
    console.log(err);
   }
})


export default matches;