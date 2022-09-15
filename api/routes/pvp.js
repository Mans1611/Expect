
import express, {Router} from 'express';
import Matches from '../models/Matches.js';
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
             let invitations = user.invitations;
           
                const code = MakeCode(3);
                const match = await Matches.findOne({matchId})
                let {sendInvitations} = await User.findOne({userName : sender});

                const invitation_obj = {
                   reciever,
                   sender,
                   roomId :  matchId + code,
                   time : new Date().getTime(),
                   matchTitle : `${match.firstCountry.countryName}-${match.secondCountry.countryName}`,  
                   accepted : false
                }

                invitations.push(invitation_obj);
                sendInvitations.push(invitation_obj)

                await User.updateOne({userName : sender},{sendInvitations});
                await User.updateOne({userName : reciever},{invitations});

                return res.status(200).json({found : true});
                
        }
    }catch(err){
        console.log(err);
    }
})


pvp.put('/acceptinvitation',async(req,res)=>{
    
    const {sender, reciever , roomId} = req.body; 

    let {sendInvitations} = await User.findOne({userName:sender});
    let {invitations} = await User.findOne({userName:reciever});

    sendInvitations = sendInvitations.filter((invite)=>invite.roomId !== roomId);
    invitations = invitations.filter((invite)=>invite.roomId !== roomId);

    await User.updateOne({userName : sender},{sendInvitations});
    await User.updateOne({userName : reciever},{invitations});

    res.status(200).send("done");

    
})
export default pvp; 