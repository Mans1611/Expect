import express,{Router} from 'express'
import Country from '../models/Country.js'


const country = express.Router();
country.get('/countries',async(req,res)=>{
    const countries = await Country.find();
    res.send(countries);
})



country.post('/addcountry',async(req,res)=>{
    const {countryName,logo,players} = req.body;
    console.log(players);
    const newCountry = await new Country({
        countryName,
        logo,
        players
    })
    await newCountry.save(()=>{
        console.log("the country is added");
    })
    res.send(newCountry);
})
export default country;