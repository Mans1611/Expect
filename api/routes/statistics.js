import express from 'express';
import Country from '../models/Country.js';
import Matches from '../models/Matches.js';
import Teams from '../models/Teams.js';
import User from '../models/User.js';

const statistics = express.Router();

// this function destructure each countryPlayers so it collects all the players in just one array.  
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

    res.status(200).send(top5)
})

statistics.get('/topvotedgames',async(req,res)=>{
    let topVotedGames = await Matches.find().sort({votes : -1}).limit(5);
    topVotedGames = topVotedGames.map(game=>{
        let Game = {
                votes : game.votes,
                matchId : game.matchId,
                firstCountry : {
                    countryName : game.firstCountry.countryName,
                    logo : game.firstCountry.logo
                },
                secondCountry : {
                    countryName : game.secondCountry.countryName,
                    logo : game.secondCountry.logo
                },
                matchTime : game.matchTime
            } 
            return Game;
    })
    res.status(200).send(topVotedGames);
})

statistics.get('/topcountries',async(req,res)=>{
    const topCountries = await User.aggregate([
        {$match : {}},
        {$group : {_id : "$userCountry",total : {$sum : 1}}}, // the id is unique for each collection. 
        {$sort: {"total" : -1} }, // it will order it desc.
        {$limit : 2}
    ])
    res.status(200).send(topCountries)
})
statistics.get('/gettotal',async(req,res)=>{
    const totalUsers = await User.find().count();
    const totalTeams = await Teams.find().count();
    const [total] = await Matches.aggregate([
        {$match : {}}, // it brings all matches 
        {$group : {_id : "total",totalExpects :{ $sum : "$votes"}}} // id is not unique for each match to calculate all of votes
    ])

    // object to collect all of the wanted data.
    const totalObjects = [
        {title : "Total Users",number : totalUsers},
        {title : "Total Votes",number:totalTeams},
        {title : "Total Expects" , number : total.totalExpects}
    ]
    res.status(200).send(totalObjects)
})



export default statistics;
