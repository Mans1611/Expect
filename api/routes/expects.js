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
        match.votes += 1;
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
        let Match = await Matches.findOne({matchId : req.body.matchId}) // we just fetch the to update the votes as well 

        const wantedMatch = user.expects.find(((expect,index)=>{
            if(expect.matchId === req.body.matchId){
                matchindex = index;
                Match.firstCountry.players[expect.mutatePlayer1.index].votes -= 1 ;
                Match.secondCountry.players[expect.mutatePlayer2.index].votes -= 1 ;
                return expect;
            } 
        }))
        const {mutatePlayer1,mutatePlayer2} = req.body;

        Match.firstCountry.players[mutatePlayer1.index].votes +=1 ;
        Match.secondCountry.players[mutatePlayer2.index].votes +=1 ;

        await Matches.updateOne({matchId:req.body.matchId},Match);
        user.expects[matchindex] = req.body; // so we just replacce it where it found.

        await Expects.updateOne({userName: req.params.userName} , user);
       

        res.status(200).json({msg:"Successfully Updated"});
    }
    catch(err){
        console.log(err);

    }
})


// this to delet expect before the match starts 

expects.delete('/deleteExpect/:userName/:matchId', async(req,res)=>{
    try{
        let match = await Matches.findOne({matchId : req.params.matchId});
        
        if(!match.matchId) // so if the match starts it can be deleteded
            return res.status(203).send("This Match Has Started You Can't Delete It");
        
        let user = await Expects.findOne({userName : req.params.userName});
        user.expects = user.expects.filter(expect => {
            if(expect.matchId !== req.params.matchId)
                return expect;
            
            // so we delete the votes for this player   as the expect is deleted.  
            match.firstCountry.players[expect.mutatePlayer1.index].votes -=1;
            match.secondCountry.players[expect.mutatePlayer2.index].votes -=1;
            
        });
        
        await Expects.updateOne({userName : req.params.userName},user);
        match.votes -= 1 ;
        await Matches.updateOne({matchId : req.params.matchId},match);
        res.status(200).send(user.expects);
    }catch(err){
        console.log(err);
    }

})


export default expects ; 