import express , {Router} from 'express';
import Country from '../models/Country.js';
import Matches from '../models/Matches.js';


const player = express.Router();



// tihs route to return all player details. 
player.get('/:countryName/:playerName',async(req,res)=>{
   try{
    const {countryName,playerName} = req.params;
    console.log(countryName,playerName);

    const player = await Country.aggregate([
        {$match : {countryName}},
        {$unwind:"$players"},
        {$match:{"players.playerName" : playerName }}
    ]);

    res.status(200).send(player[0].players)

}
    catch(err){
        console.log(err);
    }
    

})

/*
goals += player.goals;
                    assist += player.assist
                    yellowCard+=player.yellowCard
                    redCard+=player.redCard;
                     let playerArray = [];
        let goals = 0, redCard = 0 , yellowCard = 0 , assist = 0  ;
*/




/*


*/

player.get('/playerDetails/:countryName/:index',async(req,res)=>{
    // here i take the index as a params so i can reach it without looping 
    
    try{
            const {countryName,index} = req.params;
        
            const countryShort = countryName.slice(0,3).toUpperCase();
            const Regexp = new RegExp(`${countryShort}`,'ig');
        
            const matches = await Matches.find({matchId:Regexp});
        
            let playerObject = {}, playerDetails = [];
        
            for(let match of matches){
        
                let position = match.matchId.indexOf(countryShort);
        
                if(position<2){
                  
                    playerObject = {
                        opponent : match.secondCountry.countryName,
                        playerPoints : match.firstCountry.players[index].playerPoints,
                        logo :   match.secondCountry.logo     
                    }

                }
                else{
                    playerObject = {
                        opponent : match.firstCountry.countryName,
                        playerPoints : match.secondCountry.players[index].playerPoints,
                        logo :match.firstCountry.logo,          
                    }
                    
                }
                playerDetails.push(playerObject);
            
        
        
                
            }
            res.status(200).send(playerDetails);
    }
        catch(err){
            console.log(err);
        }
})

export default player;
