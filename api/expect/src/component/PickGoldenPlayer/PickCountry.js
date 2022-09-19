import React, {useEffect, useState} from 'react'
import Axios from '../../Axios/axios';
import { handleNext,handleBack } from './utilis/handleNext';

const PickCountry = ({fetchCountry,setFetchCountry,profileSet}) => {
    const [countries,setCountries] = useState([]);
    const [selected,setSelected] = useState(null);

    const sendCountry =  ()=>{ 
        setFetchCountry(selected) ; 
        handleNext('chooseCountry-container','choosePlayer-container')

    }


     useEffect(() => {
        let isSubscribe = true;
        const fetchCountries = async()=>{
            try{
                const {data} = await Axios.get('/country/countriesName');
  
                if(isSubscribe)
                    setCountries(data);
            }
            catch(err){
                console.log(err);
            }

        }
        fetchCountries();
      return () => isSubscribe = false;
    }, [])
   
    
  return (
    <div id='chooseCountry-container' className="chooseCountry-container">
        <h2>Choose Your Player Country</h2>
        <div  className="country-container">
            {countries.map((country,index)=>{
                return (
                    <div onClick={()=>setSelected({...country,index})} key={index} className={`country-holder ${selected?.index === index ? 'selected-country':''}`}>
                        
                        <img src={country.logo} alt={country.name}/>
                        <h2>{country.countryName}</h2>
                    </div>                
                    )
            })}
        </div>
        <div className={`button-wrapper-golden ${profileSet?'buttons-end':''}`}>
            {
                !profileSet&&
                <button onClick={()=>handleBack('instructions','chooseCountry-container')} className="back">Back</button>
            }
            {
                selected ? 
                <button onClick={sendCountry} className="next">Next</button> 
                : 
                <button disabled = {true} className="next disabled">Next</button> 
            
            }

        </div>
        
    </div>
  )
}

export default PickCountry