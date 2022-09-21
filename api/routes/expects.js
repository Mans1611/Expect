import express from 'express';
import Expects from '../models/Expects.js';
import Matches from '../models/Matches.js';
import AddingPointsToUsers from './utilis/addingPointsToUsers.js';
import FilteringExpects from './utilis/FilteringExpects.js';
//import Filter_User_Expects_4Team from './utilis/FilterUserExpectsForTeam'
import User from '../models/User.js';
import verifyJwt from '../middleware/verifyJWT.js';
import VerifyUserJWT from '../middleware/VerifyUserJWT.js';
import SessionVerification from "../middleware/sessionVerify.js";
import { PushExpectToMember , DeleteExpectFromMember, UpdateExpectForMember } from './utilis/TeamExpectHandlers.js';
import { calculateGoldenPlayerPoints } from './utilis/calculateGoldenPlayerPoints.js';

const expects = express.Router();


expects.get('/:userName',SessionVerification,verifyJwt,async(req,res)=>{
    try{
        const {userName} = req.params;
         const user = await Expects.findOne({userName});
         const matches = await Matches.aggregate([
            {$match:{}},
            {$project : {_id : 0}}
        ]); // find all matches 
        
         if(!user.expects)
            return res.send({matches,userExpections:[],totalPoints:0})

        let {userExpections,totalPoints,filterMatches} = await AddingPointsToUsers(matches,user.expects);
        
        await Expects.updateOne({userName},{expects : userExpections});


    
        res.status(200).json( {
            filterMatches,
            userExpections,
            totalPoints,
    
        }); 

    }catch(err){
        console.log(err);
    }
});

expects.get('/calculategoldenPlayer/:userName',SessionVerification,verifyJwt,async(req,res)=>{
    const {userName} = req.params;
    let userDB = await User.findOne({userName});
    
    
    
    if(userDB.goldenPlayer.player){

        const countryShort =  userDB.goldenPlayer.player.countryName.slice(0,3).toUpperCase();
        const RegEx = new RegExp(`${countryShort}`,'ig');

        const matches = await Matches.find({matchId : RegEx}); // ;

        const {playerPoints,matchDetails} = calculateGoldenPlayerPoints(userDB.goldenPlayer,matches);
        playerPoints;

        userDB.goldenPlayer = {
            ...userDB.goldenPlayer,
            player : {
                ...userDB.goldenPlayer.player,
                matchDetails
            },
            totalPoints : playerPoints
        };
    }
    
    res.status(200).json( {
        goldenPlayer : userDB.goldenPlayer
    }); 
    
    await User.updateOne({userName},userDB);

})


expects.post('/addexpect/:userName',VerifyUserJWT,async(req,res)=>{
    try{
        const {userName} = req.params ; 
        const user = await Expects.findOne({userName});
        const {mutatePlayer1,mutatePlayer2} = req.body;
        const match = await Matches.findOne({matchId : req.body.matchId});
       
        // this to increse the number of votes for the se;cted player 
        match.firstCountry.players[mutatePlayer1.index].votes +=1 ; 
        match.secondCountry.players[mutatePlayer2.index].votes +=1 ;
        match.votes += 1;
        await Matches.updateOne({matchId : req.body.matchId},match);
        // here I add the match time to the user expectes, as I will need it in the Team Calculation if he joined a team.
        user.expects.push({matchTime : match.matchTime,round : match.round,...req.body});
        await Expects.updateOne({userName},user);
        
        const teamUser = await User.findOne({userName:user.userName});
        // so if the user is join a team it will push the expect also to the teamMember in the team Model.
        if(teamUser.team)
           await PushExpectToMember(teamUser,req.body,match.matchTime);

        res.status(201).json({
            msg:"Successfully Added To MyExpects Secotion",
            expects : user.expects
        });

    }catch(err){
        console.log(err);

    }
})


expects.put('/editexpect/:userName',VerifyUserJWT,async(req,res)=>{
    try{
        const {mutatePlayer1,mutatePlayer2,mutatePlayer3,mutatePlayer4,matchId} = req.body;
        const {userName} = req.params;
        let user = await Expects.findOne({userName});
        let matchindex = 0;
        let Match = await Matches.findOne({matchId}) // we just fetch the to update the votes as well 

        const wantedMatch = user.expects.find(((expect,index)=>{
            if(expect.matchId === matchId){
                matchindex = index;
                Match.firstCountry.players[expect.mutatePlayer1.index].votes -= 1 ;
                Match.firstCountry.players[expect.mutatePlayer2.index].votes -= 1 ;
                Match.secondCountry.players[expect.mutatePlayer3.index].votes -= 1 ;
                Match.secondCountry.players[expect.mutatePlayer4.index].votes -= 1 ;
                return expect;
            } 
        }))
        
        Match.firstCountry.players[mutatePlayer1.index].votes +=1;
        Match.firstCountry.players[mutatePlayer2.index].votes +=1;
        Match.secondCountry.players[mutatePlayer3.index].votes +=1;
        Match.secondCountry.players[mutatePlayer4.index].votes +=1;

        await Matches.updateOne({matchId},Match);
        user.expects[matchindex] = { ...user.expects[matchindex] ,...req.body}; // so we just replacce it where it found.

        await Expects.updateOne({userName} , user);
        
        const userTeam = await User.findOne({userName});
        if(userTeam.team)
            await UpdateExpectForMember(userTeam,matchId,req.body);

        res.status(200).json({
            msg:"Successfully Updated",
            expects : user.expects
        });
    }
    catch(err){
        console.log(err);

    }
})


expects.put('/substitute/:userName',VerifyUserJWT,async(req,res)=>{
    let {mutatePlayer1,mutatePlayer2,mutatePlayer3,mutatePlayer4,matchId} = req.body;
    
    const {userName} = req.params;
    let userExpects = await Expects.findOne({userName});
    let Match = await Matches.findOne({matchId}) // we just fetch the to update the votes as well 
   

    if(Match.matchStatue !== "HT")
        return res.status(400).json({msg : "You can not make this subs"})

    const wantedMatch = userExpects.expects.find(((expect,index)=>{
        if(expect.matchId === matchId){

            // here if the new mutate player is not equal with the old one it means that the player is being substituted.
            if(mutatePlayer1.playerName !== expect.mutatePlayer1.playerName){
                userExpects.expects[index].mutatePlayer1 = {
                    ...mutatePlayer1,
                    subs : true,
                    HT_Points : Match.firstCountry.players[mutatePlayer1.index].playerPoints
                }
               
            }
            else if(mutatePlayer2.playerName !== expect.mutatePlayer2.playerName){
                userExpects.expects[index].mutatePlayer2 = {
                    ...mutatePlayer2,
                    subs : true,
                    HT_Points : Match.firstCountry.players[mutatePlayer2.index].playerPoints
                }
            }
            else if(mutatePlayer3.playerName !== expect.mutatePlayer3.playerName){
                userExpects.expects[index].mutatePlayer3 = {
                    ...mutatePlayer3,
                    subs : true,
                    HT_Points : Match.secondCountry.players[mutatePlayer3.index].playerPoints
                }
            }
            else if(mutatePlayer4.playerName !== expect.mutatePlayer4.playerName){
                userExpects.expects[index].mutatePlayer4 = {
                    ...mutatePlayer4,
                    subs : true,
                    HT_Points : Match.secondCountry.players[mutatePlayer4.index].playerPoints
                }
            }
          
            return expect;
        } 
    }))

    await Expects.updateOne({userName},userExpects);
    
    res.status(200).json({
        msg:"Successfully Updated",
        expects : userExpects
    });
    
    const user = await User.findOne({userName});
    if(user.team)
        await UpdateExpectForMember(user,matchId,userExpects);


})





// this to delet expect before the match starts 

expects.delete('/deleteExpect/:userName/:matchId', async(req,res)=>{
    try{
        const {matchId,userName} = req.params;

        let match = await Matches.findOne({matchId });
        
        if(!match.matchId) // so if the match starts it can be deleteded
            return res.status(203).send("This Match Has Started You Can't Delete It");
        
        let user = await Expects.findOne({userName});
        user.expects = user.expects.filter(expect => {
            if(expect.matchId !== matchId)
                return expect;
            
            // so we delete the votes for this player   as the expect is deleted.  
            match.firstCountry.players[expect.mutatePlayer1.index].votes -=1;
            match.secondCountry.players[expect.mutatePlayer2.index].votes -=1; 
        });

        await Expects.updateOne({userName},user);
        match.votes -= 1 ;
        await Matches.updateOne({matchId},match);
        const userTeam = await User.findOne({userName : user.userName});
        if(userTeam.team)
            await DeleteExpectFromMember(userTeam,matchId);
        res.status(200).send(user.expects);
    }catch(err){
        console.log(err);
    }

})


export default expects ; 