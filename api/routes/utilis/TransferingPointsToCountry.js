
import Country from "../../models/Country.js";

export default async function TransferingPointsToCountry(firstCountryName,secondCountryName,match){
    try{
        let firstCountry = await Country.findOne({countryName:firstCountryName});
        let secondCountry = await Country.findOne({countryName:secondCountryName});
        // this loop will transfer the points to the players in Country Models after the game is done
        
        firstCountry.players.forEach((val,index)=>{
            val.totalPoints += match.firstCountry.players[index].playerPoints;
            val.totalVotes += match.firstCountry.players[index].votes;
        })

        secondCountry.players.forEach((val,index)=>{
            val.totalPoints += match.secondCountry.players[index].playerPoints;
            val.totalVotes += match.secondCountry.players[index].votes;

        })
        const checkGroupstage = match.round.match(/Group Stage/ig);
        console.log(checkGroupstage);

        if(match.firstCountry.result > match.secondCountry.result && checkGroupstage)
            firstCountry.points += 3;
        else if(match.firstCountry.result < match.secondCountry.result && checkGroupstage)
            secondCountry.points += 3;
        else if(match.firstCountry.result === match.secondCountry.result && checkGroupstage){
            firstCountry.points += 1;
            secondCountry.points += 1
        }

        await Country.updateOne({countryName:firstCountryName},firstCountry);
        await Country.updateOne({countryName:secondCountryName},secondCountry);


    }catch(err){
        console.log(err);
    }
}