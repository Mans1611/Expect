import Matches from "../models/Matches.js";
import addingPointsPlayer from "../routes/utilis/addingPointsPlayers.js";

const updateMatch = async(data)=>{
    
    const fullTime = data.fullTime ? data.fullTime : false;
    let match = await Matches.findOne({matchId:data.matchId});
    
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
    await Matches.updateOne({matchId:data.matchId},match) 
}
export {updateMatch};