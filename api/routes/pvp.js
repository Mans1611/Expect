
import express, {Router} from 'express';
import Matches from '../models/Matches.js';
import PVP from '../models/PVP.js';
import User from '../models/User.js';
import MakeCode from './utilis/RandomChar.js';

const pvp = express.Router();


pvp.get('/invitations/:userName',async(req,res)=>{
    const {userName} = req.params;
    try{
        const {invitations} = await User.findOne({userName}).limit(10);
        res.status(200).send(invitations);

    }catch(err){
        console.log(err);
    }
})

pvp.post('/invite',async(req,res)=>{
    try{
        const {reciever,sender,matchId} = req.body;

        let user = await User.findOne({reciever});

        if(!user)
            return res.status(200).json({found : false});

        else {
             let invitations = user.invitations; // user invitions . 
           
                const code = MakeCode(3);
                const match = await Matches.findOne({matchId})
                let {invitations : senderInvitions} = await User.findOne({userName : sender});

                const invitation_obj = {
                   reciever,
                   sender,
                   roomId :  matchId + code,
                   time : new Date().getTime(),
                   matchTitle : `${match.firstCountry.countryName}-${match.secondCountry.countryName}`,  
                   accepted : false,
                   matchId,
                   concatNames : reciever+sender,
                   
                }

                invitations.push({...invitation_obj,type : 'reciever'});
                senderInvitions.push({...invitation_obj,type : 'sender'})

                await User.updateOne({userName : sender},{invitations :senderInvitions});
                await User.updateOne({userName : reciever},{invitations});

                return res.status(200).json({found : true,invitation_obj});
                
        }
    }catch(err){
        console.log(err);
    }
})

pvp.get('/checkAvaliablePVP/:userName/:matchId',async(req,res)=>{
    const {userName,matchId} = req.params;
    const user = await User.aggregate([
        {$unwind: "$invitations"},
        {$match : {userName, "invitations.matchId" : matchId}},
        {$project : {invitations : 1,_id:0}}
    ]);
   

    res.status(200).json({invitations:user[0].invitations});
})


pvp.put('/acceptinvitation',async(req,res)=>{
    const {sender, reciever , roomId, matchId} = req.body;
    let {invitations:senderInvitions} = await User.findOne({userName:sender});
    let {invitations:recieverInvitations} = await User.findOne({userName:reciever});

    senderInvitions.forEach((invite,index)=> {
        if(invite.concatNames.includes(sender) && invite.matchId === matchId)
            senderInvitions[index].accepted = true;
    } )
    recieverInvitations.forEach((invite,index)=> {
        if(invite.concatNames.includes(reciever) && invite.matchId === matchId)
        recieverInvitations[index].accepted = true;
    } )

    await User.updateOne({userName : sender},{invitations : senderInvitions});
    await User.updateOne({userName : reciever},{invitations : recieverInvitations});

    const pvp = new PVP({
        opponent1 : sender,
        opponent2 : reciever,
        roomId,
        matchId,
    })
    await pvp.save();
    res.status(200).send("done");

    
})
export default pvp; 