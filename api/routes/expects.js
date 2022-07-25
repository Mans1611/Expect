import express from 'express';
import Expects from '../models/Expects.js';
import Matches from '../models/Matches.js';
import AddingPointsToUsers from './utilis/addingPointsToUsers.js';
import FilteringExpects from './utilis/FilteringExpects.js';
import User from '../models/User.js';

const expects = express.Router();


expects.get('/:username',async(req,res)=>{
    try{
        const user = await Expects.findOne({userName : req.params.username});
        const matches = await Matches.find();
        const {userExpections,totalPoints} = AddingPointsToUsers(matches,user.expects);
        
        await User.findOneAndUpdate({userName:req.params.username},{userPoints:totalPoints});
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
        match.firstCountry.players[mutatePlayer1.index].votes +=1 ; // this to increse the number of votes for the se;cted player 
        match.secondCountry.players[mutatePlayer2.index].votes +=1 ;
        await Matches.updateOne({matchId : req.body.matchId},match);
        user.expects.push(req.body);
        await Expects.updateOne({userName:req.params.userName},user);
        res.status(201).json({msg:"Successfully Added To MyExpects Secotion"});
    }catch(err){
        console.log(err);

    }
})
expects.put('/editexpect/:userName',async(req,res)=>{
    try{
        let user = await Expects.findOne({userName : req.params.userName});
        let matchindex = 0;
        const wantedMatch = user.expects.find(((match,index)=>{
            if(match.matchId === req.body.matchId){
                matchindex = index;
                return match
            } 
        }))
        user.expects[matchindex] = req.body;
        await Expects.updateOne({userName: req.params.userName} , user);
       

        res.status(200).json({msg:"Successfully Updated"});
    }
    catch(err){
        console.log(err);

    }




})


export default expects ; 