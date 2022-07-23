
import Country from "../../models/Country.js";

export default async function TransferingPointsToCountry(firstCountryName,secondCountryName,match){
    try{
        let firstCountry = await Country.findOne({countryName:firstCountryName});
        let secondCountry = await Country.findOne({countryName:secondCountryName});
        // this loop will transfer the points to the players in Country Models after the game is done
        firstCountry.players.forEach((val,index)=>{
            val.totalPoints += match.firstCountry.players[index].playerPoints;
        })

        secondCountry.players.forEach((val,index)=>{
            val.totalPoints += match.secondCountry.players[index].playerPoints;
        })
        console.log(firstCountry.players[0]);

        await Country.findOneAndUpdate({countryName:firstCountryName},firstCountry);
        await Country.findOneAndUpdate({countryName:secondCountryName},secondCountry);


    }catch(err){
        console.log(err);
    }
}