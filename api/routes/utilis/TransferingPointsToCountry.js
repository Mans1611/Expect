
import Country from "../../models/Country.js";

export default async function TransferingPointsToCountry(firstCountryName,secondCountryName,match){
    try{
        let firstCountry = await Country.findOne({countryName:firstCountryName});
        let secondCountry = await Country.findOne({countryName:secondCountryName});
        // this loop will transfer the points to the players in Country Models after the game is done
        
        firstCountry.players.forEach((val,index)=>{
            val.totalPoints += match.firstCountry.players[index].playerPoints;
            val.totalVotes += match.firstCountry.players[index].votes;
            val.goals +=  match.firstCountry.players[index].goals;
            val.assist +=  match.firstCountry.players[index].assist;
            val.redCard +=  match.firstCountry.players[index].redCard;
            val.yellowCard +=  match.firstCountry.players[index].yellowCard; 
            val.manOfTheMatch +=  match.firstCountry.players[index].manOfTheMatch; 
            val.blockChances +=  match.firstCountry.players[index].blockChances; 

        })

        secondCountry.players.forEach((val,index)=>{
            val.totalPoints += match.secondCountry.players[index].playerPoints;
            val.totalVotes += match.secondCountry.players[index].votes;
            val.goals +=  match.secondCountry.players[index].goals;
            val.assist +=  match.secondCountry.players[index].assist;
            val.redCard +=  match.secondCountry.players[index].redCard;
            val.yellowCard +=  match.secondCountry.players[index].yellowCard; 
            val.manOfTheMatch +=  match.secondCountry.players[index].manOfTheMatch; 
            val.blockChances +=  match.secondCountry.players[index].blockChances; 
        })


        const checkGroupstage = match.round.match(/Group Stage/ig);
       if(checkGroupstage){
            // for goals difference 

            // first country
            firstCountry.goalScored.group+= parseInt(match.firstCountry.result); // to convert it from string to number.
            firstCountry.goalRecieved.group+= parseInt(match.secondCountry.result);
            // secondCountry
            secondCountry.goalScored.group+=parseInt(match.secondCountry.result); // scored
            secondCountry.goalRecieved.group+=parseInt(match.firstCountry.result); // recieved 
            
           if(match.firstCountry.result > match.secondCountry.result  )
               firstCountry.points += 3;
           else if(match.firstCountry.result < match.secondCountry.result)
               secondCountry.points += 3;
           else if(match.firstCountry.result === match.secondCountry.result){
               firstCountry.points += 1;
               secondCountry.points += 1
           }
       }
       // if the match was not a group stage match. 
       else{
        firstCountry.goalScored.knockout+=parseInt(match.firstCountry.result);
        firstCountry.goalRecieved.knockout+=parseInt(match.secondCountry.result);

        secondCountry.goalScored.knockout+=match.secondCountry.result;
        secondCountry.goalRecieved.knockout+=match.firstCountry.result;
       }

        await Country.updateOne({countryName:firstCountryName},firstCountry);
        await Country.updateOne({countryName:secondCountryName},secondCountry);


    }catch(err){
        console.log(err);
    }
}