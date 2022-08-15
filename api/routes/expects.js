import express from 'express';
import Expects from '../models/Expects.js';
import Matches from '../models/Matches.js';
import AddingPointsToUsers from './utilis/addingPointsToUsers.js';
import FilteringExpects from './utilis/FilteringExpects.js';
//import Filter_User_Expects_4Team from './utilis/FilterUserExpectsForTeam'
import User from '../models/User.js';
import SessionVerification from "../middleware/sessionVerify.js";
import Teams from '../models/Teams.js';
import { PushExpectToMember , DeleteExpectFromMember, UpdateExpectForMember } from './utilis/TeamExpectHandlers.js';

const expects = express.Router();


expects.get('/:userName',SessionVerification,async(req,res)=>{
    try{
        const {userName} = req.params;
        const user = await Expects.findOne({userName});
        const matches = await Matches.find();
        if(!user.expects)
            return res.send({matches,userExpections:[],totalPoints:0})
        const {userExpections,totalPoints} = await AddingPointsToUsers(matches,user.expects);
        await User.findOneAndUpdate({userName},{userPoints:totalPoints});
        await Expects.updateOne({userName},{expects : userExpections});
        res.status(200).json({matches,userExpections,totalPoints});

    }catch(err){
        console.log(err);
    }
});


expects.post('/addexpect/:userName',async(req,res)=>{
    try{
        const user = await Expects.findOne({userName:req.params.userName});
        const {mutatePlayer1,mutatePlayer2} = req.body;
        const match = await Matches.findOne({matchId : req.body.matchId});

        // this to increse the number of votes for the se;cted player 
        match.firstCountry.players[mutatePlayer1.index].votes +=1 ; 
        match.secondCountry.players[mutatePlayer2.index].votes +=1 ;
        match.votes += 1;
        await Matches.updateOne({matchId : req.body.matchId},match);
        // here I add the match time to the user expectes, as I will need it in the Team Calculation if he joined a team.
        user.expects.push({matchTime : match.matchTime,...req.body});
        await Expects.updateOne({userName:req.params.userName},user);
        
        const teamUser = await User.findOne({userName:user.userName});
        // so if the user is join a team it will push the expect also to the teamMember in the team Model.
        if(teamUser.team)
           await PushExpectToMember(teamUser,req.body,match.matchTime);

        res.status(201).json({msg:"Successfully Added To MyExpects Secotion"});
    }catch(err){
        console.log(err);

    }
})
expects.put('/editexpect/:userName',async(req,res)=>{
    try{
        const {mutatePlayer1,mutatePlayer2,matchId} = req.body;
        const {userName} = req.params;
        let user = await Expects.findOne({userName});
        let matchindex = 0;
        let Match = await Matches.findOne({matchId}) // we just fetch the to update the votes as well 

        const wantedMatch = user.expects.find(((expect,index)=>{
            if(expect.matchId === matchId){
                matchindex = index;
                Match.firstCountry.players[expect.mutatePlayer1.index].votes -= 1 ;
                Match.secondCountry.players[expect.mutatePlayer2.index].votes -= 1 ;
                return expect;
            } 
        }))

        Match.firstCountry.players[mutatePlayer1.index].votes +=1 ;
        Match.secondCountry.players[mutatePlayer2.index].votes +=1 ;

        await Matches.updateOne({matchId},Match);
        user.expects[matchindex] = req.body; // so we just replacce it where it found.

        await Expects.updateOne({userName} , user);
        const userTeam = await User.findOne({userName});
        if(userTeam.team)
            await UpdateExpectForMember(userTeam,matchId,req.body);

        res.status(200).json({msg:"Successfully Updated"});
    }
    catch(err){
        console.log(err);

    }
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