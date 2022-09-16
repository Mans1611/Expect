import express , {Router} from 'express';
import Country from '../models/Country.js';


const player = express.Router();



player.get('/:countryName/:playerName',async(req,res)=>{
    const {countryName,playerName} = req.params;
    try{
    const player = await Country.aggregate([
        {$match : {countryName}},
        {$unwind:"$players"},
        {$match:{"players.playerName" : playerName }}
    ]);

    res.send(player[0].players);
}
catch(err){
    console.log(err);
}
    

})


export default player;
