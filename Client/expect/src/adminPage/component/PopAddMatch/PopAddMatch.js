import './popaddmatch.scss' ; 
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import { useEffect } from 'react';
import axios from 'axios';
import CountryPop from '../countryPop/CountryPop';
import AddIcon from '@mui/icons-material/Add';
import { matchesStore } from '../../Context/matchesContext';
const PopAddMatch = ({showPop,setShowPop}) => {
  const hidePop = (e)=>{
      if(e.target.className === 'popaddMatch'){
        setShowPop(false);
      }
  }
  const [isLoading,setLoading] = useState(true);
  const [countries,setCountries] = useState(null);
  const [firstCountry,setFirstCountry] = useState(null)
  const [secondCountry,setSecondCountry] = useState(null);
  const [showCountry,setShowCountry] = useState(false);
  const store = matchesStore();

  useEffect(()=>{
    return async ()=>{
      try{
        const response = await axios.get('/country/countries');
        setCountries(response.data);
        setLoading(false);
      }catch(err){
        console.log(err);
      }
    }
  },[])

  const handleSelect = (e)=>{
    e.preventDefault();
    if(!document.querySelector('input[name="country"]:checked'))
      return null;

    const checkedCountry =  document.querySelector('input[name="country"]:checked').value;

    // for setting country in upper icon 
    if(!firstCountry){
      for(let country of countries){
        if(checkedCountry === country.countryName){
          setFirstCountry(country);
          break;
        }
      }
    }
      else {
        for(let country of countries){
          if(checkedCountry === country.countryName){
            setSecondCountry(country);
            break;
          }
        }

      }

    setShowCountry(false);
  }

  const handlePost = async()=>{
    const time = document.querySelector('input[name="time"]').value;
    const date = document.querySelector('input[name="date"]').value;
    const matchId = document.querySelector('input[name="matchId"]').value;
    if(time !=='' && date !=='' && firstCountry  && secondCountry && matchId !==''){
      const matchTime = `${date} ${time}`;
      try{
        await axios.post('/matches/addgame',{
          matchTime,
          firstCountry,
          secondCountry,
          matchId
        })
        const response = await axios.get('/matches/getmatches')
        store.setMatches(response.data);
        setShowPop(false);
      }catch(err){
        console.log(err);
      }


    }

  }
  

    return (
        <div className="popaddMatch" onClick={hidePop}>
          <div className="popAddMatchContainer">
          { isLoading? <SmallLaoding/> :( 
            <>
                    <CloseIcon onClick={()=>{setShowPop(false)}} className='closeIcon'/>
                    <div className="selectedContries">

                      <div className='selectedCountry'>
                        {firstCountry? <CountryPop logo={firstCountry.logo} countryName={firstCountry.countryName}/> :  
                        <div  onClick={()=>{setShowCountry(true)}} className="circle"><AddIcon className='icons'/></div>}
                      </div>
                      <span className="vs">VS</span>
                      <div className='selectedCountry'>
                      {
                         secondCountry? <CountryPop logo={secondCountry.logo} countryName={secondCountry.countryName} /> :  <div onClick={()=>{setShowCountry(true)}} className="circle"><AddIcon className='icons'/></div>
                        }
                      </div>

                    </div>
                    <div className='fieldContainer'>
                        <h2>Select time Of the match</h2>
                        <div className="timeSelection">
                          <div className="timing">
                            <label htmlFor="matchDate"> Select Date</label>
                            <input type="date" name="date" id="matchDate"/>
                          </div>
                          <div className="timing">
                            <label htmlFor="matchtime"> Select Time</label>
                            <input type="time" name="time" id="matchtime"/>
                          </div>
                        </div>
                    </div>
                    <div className="fieldContainer">
                      <label htmlFor="matchId">Match Id : </label>
                      <input type="text" name="matchId" id="matchId" />
                    </div>
                    {showCountry&&
                    (
                      <div className="countriesSelection">

                      <form action="">

                      <div className="innergrid">

                        {
                        countries.map((country,index)=>(
                        <div value={country.countryName}  className='country' key={index}>
                            <input type="radio" name="country" id={country.countryName} value = {country.countryName} />
                            
                            <label htmlFor={country.countryName}>
                              <img value={country.countryName} className='countryFlage' src={country.logo} alt="" />
                              {country.countryName}
                            </label>
                        </div>
                        ))
                      }
                      </div>
                      
                      <div className="buttonWrapper">
                          <button onClick={handleSelect} >OK</button>
                      </div>

                      </form>
                    </div>
                    )}
                    
                    </>
                )
              }

                    <div className="buttonWrapper post">
                      <button id='postButton' onClick={handlePost} >Save The Game</button>
                    </div>
              </div>
        </div>
      );
}
 
export default PopAddMatch;