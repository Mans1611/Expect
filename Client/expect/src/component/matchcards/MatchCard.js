import {  createContext, useState } from 'react';
import { connect } from 'react-redux';
import fetchData from '../../fetchData';
import Loading from '../loading/big.loading/Loading';
//import fetchData from '../../fetchData';
import PopMatchCard from '../popmatchcard/PopMatchCard';
import './matchcard.scss';
import { ThemeContext } from '../../App';
import { globalUser } from '../../Context/HomeContext';
import TimeCounter from '../../TimeCounter';
import MatchResultComp from '../../adminPage/component/MatchCardComponent/MatchResultComp';
import { Link } from 'react-router-dom';




export const MatchCardContext = createContext(null);
const MathchCard = ({match}) => {

    const [pop,setPop] = useState(false);
    const [timeUp, setTimeUp] = useState(false); 
    const togglePop = ()=>{
        setPop(!pop);
    }
    const {isDark} = globalUser(); 
    

  
   
    return ( 
    <MatchCardContext.Provider value={{match}}>

       
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
            {!timeUp && 
                <div className="matchCardStart">
                    { <button onClick={togglePop} className='matchCardbutton'>Expext</button>}
                </div>
            } 
                {!timeUp && pop && <PopMatchCard pop={pop} togglePop={togglePop} dark = {isDark} match={match}/>}
            
            {timeUp && <MatchResultComp result_1={match.firstCountry.result} result_2={match.secondCountry.result}/> }
           </div>
        </MatchCardContext.Provider>
     );
}

export default MathchCard;