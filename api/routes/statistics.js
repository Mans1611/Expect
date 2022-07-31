import express from 'express';
import Country from '../models/Country.js';

const statistics = express.Router();

const FindAllPlayers = async()=>{
    const countries = await Country.find(); // array of  countries 
    // this will just accumulate all the players from all of the countruies 
    const players = countries.reduce((previousPlayers,current) => {
            return [...previousPlayers,...current.players];
        },[])
        
        return players;
}

statistics.get('/topplayers',async(req,res)=>{
    try{
        const players = await FindAllPlayers();

        // so it will sort theme desc . 
        const sorted = players.sort((nextValue,currentValue)=> currentValue.totalPoints - nextValue.totalPoints);
        const top5 = sorted.slice(0,5); // just to take the top 5 of the top players.
        res.status(200).send(top5)

    }
    catch(err){
        console.log(err);
    }
})

statistics.get('/topvoted',async (req,res)=>{
    const players = await FindAllPlayers();

    // so it will sort theme desc . 
    const sorted = players.sort((nextValue,currentValue)=> currentValue.totalVotes - nextValue.totalVotes);
    const top5 = sorted.slice(0,5); // just to take the top 5 of the top players.
    console.log(top5[0].totalVotes);
    res.status(200).send(top5)
})


export default statistics;
