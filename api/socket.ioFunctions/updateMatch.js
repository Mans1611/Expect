import Matches from "../models/Matches.js";
import addingPointsPlayer from "../routes/utilis/addingPointsPlayers.js";
import { MatchHalfs } from "../routes/utilis/MatchHalfs.js";
import TransferingPointsToCountry from "../routes/utilis/TransferingPointsToCountry.js";

const updateMatch = async(data)=>{
    
    const fullTime = data.fullTime ? data.fullTime : false;
    try{

    let match = await Matches.findOne({matchId:data.matchId});
        if(data.matchStatus){
            match = MatchHalfs(match,data.matchStatus);
        }
        
    if(fullTime && data.matchStatue === "FT"){
        await TransferingPointsToCountry(match.firstCountry.countryName,match.secondCountry.countryName,match);
        const icon = 'https://www.pngrepo.com/png/277622/512/whistle.png'    
        match.states.push({playerName : "",state : `Full Time ${match.firstCountry.result} - ${match.secondCountry.result} `, min : "FT" , icon,country:'both'});       
    }
    
    // so this code for uodating the time if the admin wants to
    
    match.matchStatue = data.matchStatue ? data.matchStatue : match.matchStatue;
    
    if(data.matchTime){
        match.matchTime = data.matchTime;
        match.matchStatue = "UpComing" // so if we edit the the time we make sure to update the statue
        match.stoppingTime = 0
    }
    const {updatedPlayer_1,updatedPlayer_2} = data;
    match.firstCountry.result = data.result1 ? data.result1 : match.firstCountry.result ;
    match.secondCountry.result = data.result2 ? data.result2 : match.secondCountry.result ;
    match.fullTime = fullTime;
    
    if(updatedPlayer_1){
        match = await addingPointsPlayer(updatedPlayer_1,match.firstCountry.countryName,match);
        match.states.push(updatedPlayer_1);
    }
    if(updatedPlayer_2){
        match = await addingPointsPlayer(updatedPlayer_2,match.secondCountry.countryName,match);
        match.states.push(updatedPlayer_2);
    }
     await Matches.updateOne({matchId:data.matchId},match) ;
    
    
}
catch(err){
    console.log(err);
}
}
export {updateMatch};