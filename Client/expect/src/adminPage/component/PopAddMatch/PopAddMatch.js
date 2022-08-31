import './popaddmatch.scss' ; 
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import { useEffect } from 'react';
import axios from 'axios';
import CountryPop from '../countryPop/CountryPop';
import AddIcon from '@mui/icons-material/Add';
import { matchesStore } from '../../Context/matchesContext';
import Axios from '../../../Axios/axios';
import { AdminContext } from '../../Context/ProtectedAdmin';
import { useNavigate } from 'react-router-dom';
const PopAddMatch = ({showPop,setShowPop}) => {
  document.body.style.overflow = 'hidden';
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
  const [round,setRound] = useState('Group Stage Round-1');
  
  const {token,setAdminAuth} = AdminContext()
  const store = matchesStore();

  const navigate = useNavigate()
  useEffect(()=>{
    let subscribe = true ; 

    const fetchCountries = async()=>{
      try{
        const {data} = await Axios.get('/country/countries');
        setCountries(data);
        setLoading(false);
      }catch(err){
        console.log(err);
      }
    }
    if(subscribe) fetchCountries();

    return ()=> subscribe = false;
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
    let time = document.querySelector('input[name="time"]').value;
    let date = document.querySelector('input[name="date"]').value;
    if(time !=='' && date !=='' && firstCountry  && secondCountry){
      date = date.split('-');
      const matchTime = `${date[1]},${date[2]},${date[0]},${time}`;
      
      try{
        const Response = await Axios.post('/matches/addgame',{
          matchTime,
          firstCountry,
          secondCountry,
          round 
        },{
          headers : {
            token
          }
        })

        if(Response.status >= 400) {
          setAdminAuth(false)
          return navigate('/adminpage/login')
        }

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
                            <input draggable type="date" name="date" id="matchDate"/>
                          </div>
                          <div className="timing">
                            <label htmlFor="matchtime"> Select Time</label>
                            <input type="time" name="time" id="matchtime"/>
                          </div>
                        </div>

                      <div className="timeSelection">
                         <div className="timing">
                          <label htmlFor="round">Round </label>
                          <select onChange={(e)=>setRound(e.target.value)} type="text" name="round" id ="round" >
                              <option>Group Stage Round-1</option>
                              <option>Group Stage Round-2</option>
                              <option>Group Stage Round-3</option>
                              <option>Round-16</option>
                              <option>Quarter-Final</option>
                              <option>Semi-Final</option>
                              <option>3rd Place Winner</option>
                              <option>Final</option>
                          </select>
                        </div>
                    </div>
                    </div>

                    
                    {showCountry&&
                    (
                      <div className="countriesSelection">

                      <form action="">

                      <div className="buttonWrapper ok">
                          <button onClick={handleSelect} >OK</button>
                      </div>
                      <div className="innergrid">

                        {
                        countries.map((country,index)=>(
                        <div value={country.countryName}  className='country' key={index}>
                            <input type="radio" name="country" id={country.countryName} value = {country.countryName} />
                            
                            <label htmlFor={country.countryName}>
                              <img value={country.countryName} className='countryFlage' src={country.logo} alt={country.logo} />
                              {country.countryName}
                            </label>
                        </div>
                        ))
                      }
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