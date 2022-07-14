import express,{Router} from 'express'
import Country from '../models/Country.js'


const country = express.Router();
country.get('/countries',async(req,res)=>{
    const countries = await Country.find();
    res.status(200).send(countries);
})


// must be an autorization for admins.

country.get('/:country_name',async(req,res)=>{
    const country = await Country.findOne({countryName:req.params.country_name})
    if(!country)
        return res.status(404).json({msg :`${req.params.country_name} is not found`})
    
        res.json({
        country,
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