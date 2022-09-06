import express,{Router} from 'express'
import Country from '../models/Country.js'


const country = express.Router();
country.get('/countries',async(req,res)=>{
    const countries = await Country.find();
    res.status(200).send(countries);
})


country.get('/players',async(req,res)=>{
    const country = await Country.findOne({countryName : req.query.countryName});
    if(!country)
        return res.status(404).send("this Country is not found");
    res.status(200).send(country.players);
    
    
})
country.get('/topPlayers/:countryName',async(req,res)=>{
    const {countryName} = req.params;
    console.log(countryName);
    try{
        const topPlayers = await Country.aggregate([
            {$match : {countryName}},
            {$unwind : "$players"},
            {$sort : {"players.totalPoints" : -1}},
            {$limit : 5}
        ])

        res.status(200).json({topPlayers});

    }catch(err){

    }
})
// must be an autorization for admins.
country.get('/:country_name',async(req,res)=>{
    const country = await Country.findOne({countryName:req.params.country_name})
    if(!country)
        return res.status(404).json({msg :`${req.params.country_name} is not found`});
        
    let totalPoints = 0;
    for(let player of country.players)
        totalPoints += player.totalPoints;
    
    res.json({
        country,
        totalPoints,
        msg : ` ${req.params.country_name} is Avaliable`
    })
})





country.post('/addcountry',async(req,res)=>{
    const {countryName,logo,players} = req.body;
    const countryDB = await Country.findOne({countryName});
    // this to check if the country exist in the DB or not.
    if(countryDB)
        return res.status(200).json({
            msg:"The Country is Already Exist"
        })
    
    const newCountry = await new Country({
        countryName,
        logo,
        players
    })
    
    await newCountry.save(()=>{
        console.log("the country is added");
    })
    res.status(201).json({
        msg:"Country is added successfully"
    });
})

export default country;