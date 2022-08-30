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
        
    if(match.fullTime){
        await TransferingPointsToCountry(match.firstCountry.countryName,match.secondCountry.countryName,match);
    }
    console.log(match.fullTime);
    // so this code for uodating the time if the admin wants to
    
    //match.matchStatue = data.matchStatue ? data.matchStatue : match.matchStatue;
    
    if(data.matchTime){
        match.matchTime = data.matchTime;
        match.matchStatue = "UpComing" // so if we edit the the time we make sure to update the statue
        match.stoppingTime = 0
    }
    const {updatedPlayer_1,updatedPlayer_2} = data;
    match.firstCountry.result = data.result1 ? data.result1 : match.firstCountry.result ;
    match.secondCountry.result = data.result2 ? data.result2 : match.secondCountry.result ;

    
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