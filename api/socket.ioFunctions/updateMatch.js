import Matches from "../models/Matches.js";
import addingPointsPlayer from "../routes/utilis/addingPointsPlayers.js";
import { MatchHalfs } from "../routes/utilis/MatchHalfs.js";
import TransferingPointsToCountry from "../routes/utilis/TransferingPointsToCountry.js";
import { client } from "../index.js";


const updateMatch = async(data)=>{
    
    // const fullTime = data.fullTime ? data.fullTime : false;
    
    try{
    let match = await Matches.findOne({matchId:data.matchId});

        if(data.matchStatus){
            match = MatchHalfs(match,data.matchStatus);
        }
    
    if(match.fullTime && data.matchStatus !== 'Match Is Done'){
        await TransferingPointsToCountry(match.firstCountry.countryName,match.secondCountry.countryName,match);
    }
    // so this code for uodating the time if the admin wants to
    
    //match.matchStatue = data.matchStatue ? data.matchStatue : match.matchStatue;
    
    if(data.matchTime){
        match.matchTime = data.matchTime;
        match.matchStatue = "UpComing" // so if we edit the the time we make sure to update the statue
       
    }
    const {updatedPlayer_1,updatedPlayer_2} = data;
    match.firstCountry.result = data.result1 ? data.result1 : match.firstCountry.result ;
    match.secondCountry.result = data.result2 ? data.result2 : match.secondCountry.result ;

    // in the front end the admin dosn't have to choose both player so i put icon in fron end null so it mean it not required.
    
    if(updatedPlayer_1){
        match = await addingPointsPlayer(updatedPlayer_1,match.firstCountry.countryName,match);
        match.states.push(updatedPlayer_1);
    }

    if(updatedPlayer_2){ 
        match = await addingPointsPlayer(updatedPlayer_2,match.secondCountry.countryName,match);
        match.states.push(updatedPlayer_2);
    }
    
    if(data.matchStatus === 'Match Is Done')
         match.deadMatch = true // here sleep match  is a flage that the match has ended with all state like man of the match, so we dont need to calculate the state all over again.
    
        await Matches.updateOne({matchId:data.matchId},match) ;
        
        const matches = await Matches.find();

        await client.set("allMatches",JSON.stringify(matches));
        
    
}
catch(err){
    console.log(err);
}
}
export {updateMatch};