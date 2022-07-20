import React  from 'react'
import { useContext, useState } from 'react';
import { globalUser } from '../../../../Context/HomeContext';
import './expected.scss';
import TimeCounter from '../../../../TimeCounter';

const Expected = ({match})=> {
    
    const {isDark} = globalUser();
    const [timeUp, setTimeUp] = useState(false); 

  return (
    <div className='expectedContainer'>
        <div className={`matchCard ${isDark?'dark':''}`}>
        
        <div className="matchcardHeader">
          <div className="matchCardCountry"> {/* country1.*/ }
            <img src={match.firstCountry.logo} alt="" className="matchCardCountryImg" />
            <span className='countryLabel'>{match.firstCountry.countryName}</span>
          </div>
            VS
            <div className="matchCardCountry">
                <img src={match.secondCountry.logo} alt="" className="matchCardCountryImg" />
                <span className='countryLabel'>{match.secondCountry.countryName}</span>
            </div>
        </div>

        { !timeUp &&
           <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime}/>
        }

        {/* if the time is up the timer will display and you cant press the Expect button  */}
        {
            <div className="matchCardStart">
                { <button  className='matchCardbutton'>See MyExpect</button>}
            </div>
    } 
            
        {/*timeUp && <MatchResultComp result_1={match.firstCountry.result} result_2={match.secondCountry.result}/> */}
       </div>
    </div>
  )
}

export default Expected