import Country from "../../models/Country.js";

export const checkPlayersToExpect = async(req,res,next)=>{
    const {countryName,playerName,nextMatch} = req.body;
    const country = await Country.findOne({countryName});
    if(!country)
        return res.status(404).send("This country is not found");
    
    req.country = country;
    
    next(); 
}