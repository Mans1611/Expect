import express from 'express';
import verifyAdmin from '../middleware/verifyAdmin.js';
import VerifyUserJWT from '../middleware/VerifyUserJWT.js';
import Country from '../models/Country.js';
import Expects from '../models/Expects.js';
import VerifyJWT from '../middleware/verifyJWT.js'
import Matches from '../models/Matches.js';
import playerToExpect from '../models/PlayersToExpect.js';
import Teams from '../models/Teams.js';
import User from '../models/User.js';
import { checkPlayersToExpect } from './utilis/checkPlayerstoExpet.js';


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
        // const players = await FindAllPlayers();
        // so it will sort theme desc.
        // const sorted = players.sort((nextValue,currentValue)=> currentValue.totalPoints - nextValue.totalPoints);
        // const top5 = sorted.slice(0,5); // just to take the top 5 of the top players.

        const allPlayer = await Country.aggregate([
            {$unwind : "$players"},
            {$sort : {"players.totalPoints":-1}},
            {$limit : 5},
            {$project : {eliminated : 0,_id : 0 } }
        ])  ;
        res.status(200).send(allPlayer)


    }
    catch(err){
        console.log(err);
    }
})

statistics.get('/topvoted',async (req,res)=>{
    // const players = await FindAllPlayers();

    // so it will sort theme desc . 
    // const sorted = players.sort((nextValue,currentValue)=> currentValue.totalVotes - nextValue.totalVotes);
    // const top5 = sorted.slice(0,5); // just to take the top 5 of the top players.

    const Top5Voted = await Country.aggregate([
        {$unwind : "$players"},
        {$sort : {"players.totalVotes" : -1}},
        {$limit : 5},
        {$project : {eliminated : 0,_id : 0 } }
    ])

    res.status(200).send(Top5Voted)
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
                matchTime : game.matchTime,
                matchStatus : game.matchStatue
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
statistics.get('/topusers',async(req,res)=>{
    const {round} = req.query;

    const topUsers = await Expects.aggregate([
        {$unwind : "$expects"},
        {$match : {"expects.round" : round}},
        {$group : {_id:"$userName", roundPoints : {$sum : "$expects.userPoints"}}},
        {$sort : {"roundPoints" : -1}},
    ]);
    res.send(topUsers)
})

statistics.get('/topusersinmatch/:matchId',async(req,res)=>{
    const {matchId} = req.params;
    const topUsers = await Expects.aggregate([
        {$unwind : "$expects"},
        {$match : {"expects.matchId" : matchId}},
        {$sort : {"expects.userPoints" : -1}},
        {$project : {_id : 0}}
    ]);
    const match = await Matches.findOne({matchId});

    res.status(200).json({topUsers,match});
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
        {title : "Total Teams",number:totalTeams},
        {title : "Total Expects" , number : (total? total.totalExpects : 0)}
    ]
    res.status(200).send(totalObjects)
})
statistics.post('/createPlayertoexpect',verifyAdmin,async(req,res)=>{
    const {Player:player} = req.body;
    
    const Player = new playerToExpect({...req.body});
    await Player.save(()=>{
        console.log("players to watch is done");
    }); 
    res.status(200).json({player,msg:"Succussfully Added To Players to Expect"});
    

})

statistics.get('/getplayerstoExpect',async(req,res)=>{
    const players = await playerToExpect.find().limit(4);
    res.status(200).send(players);
})
statistics.delete('/deleterecomendation',async(req,res)=>{
    const players = await playerToExpect.deleteMany();
    return res.status(200).send("Done!")
})




export default statistics;
