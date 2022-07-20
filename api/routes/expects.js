import express from 'express';
import Expects from '../models/Expects.js';
import Matches from '../models/Matches.js';

const expects = express.Router();


expects.get('/:username',async(req,res)=>{
    try{
        
        const user = await Expects.findOne({userName : req.params.username});
        console.log(user);
        if(user.expects)
            res.status(200).send(user.expects);

    }catch(err){
        console.log(err);
    }
});


expects.post('/addexpect/:userName',async(req,res)=>{
    try{
        const user = await Expects.findOne({userName:req.params.userName});

        const {mutatePlayer1,mutatePlayer2} = req.body;
        const match = await Matches.findOne({matchId : req.body.matchId});
    
        match.firstCountry.players[mutatePlayer1.index].votes +=1 ;
        match.secondCountry.players[mutatePlayer2.index].votes +=1 ;
        console.log(match.firstCountry.players[mutatePlayer1.index].votes);
        await Matches.updateOne({matchId : req.body.matchId},match);
        user.expects.push(req.body);
        await Expects.updateOne({userName:req.params.userName},user);
        res.status(201).json({msg:"Successfully Added To MyExpects Secotion"});
    }catch(err){
        console.log(err);

    }
})


export default expects ; 