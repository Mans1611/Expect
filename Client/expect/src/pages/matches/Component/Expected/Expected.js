import './expected.scss';

import React  from 'react'
import { useContext, useState } from 'react';
import { globalUser } from '../../../../Context/HomeContext';
import TimeCounter from '../../../../TimeCounter';
import MatchResultComp from '../../../../adminPage/component/MatchCardComponent/MatchResultComp';
import { MatchCardProvider } from '../../../../Context/MatchCardContext';
import PopMatchCard from '../../../../component/popmatchcard/PopMatchCard';
import PopExpectCard from '../../../../component/popmatchcard/PopExpectCard';
import MatchState from '../../../../component/MatchState/MatchState';
import { Link } from 'react-router-dom';

const Expected = ({match,userExpect})=> {
    document.body.style.overflow = 'visible';
    
    const {isDark} = globalUser();
    const [timeUp, setTimeUp] = useState(false); 
    const [seeExpect,setSeeExpect] = useState(false);
    const [statePop,setStatePop] = useState(false);


    

  return (
    <MatchCardProvider match = {match} childeren = {(

      <div className='expectedContainer'>
        <div className={`matchCard ${isDark?'dark':''}`}>
        <div className="matchcardHeader-wrapper">
          <div className="matchcardHeader">
          <Link to={`/country/${match.firstCountry.countryName}`}>
            <div className="matchCardCountry"> {/* country1.*/ }
              <img src={match.firstCountry.logo} alt="" className="matchCardCountryImg" />
              <span className='countryLabel'>{match.firstCountry.countryName}</span>
            </div>
          </Link>
            <h2>VS</h2>
            <Link to={`/country/${match.secondCountry.countryName}`}>
              <div className="matchCardCountry">
                  <img src={match.secondCountry.logo} alt="" className="matchCardCountryImg" />
                  <span className='countryLabel'>{match.secondCountry.countryName}</span>
              </div>
            </Link>
          </div>
          <div className="round">{match.round}</div>
        </div>

        { !timeUp &&
           <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime}/>
        }

        {/* if the time is up the timer will display and you cant press the Expect button  */}
        {timeUp && <MatchResultComp halfsTime={match.time} matchId = {match.matchId} FT = {match.fullTime} time = {match.matchTime} result_1={match.firstCountry.result} result_2={match.secondCountry.result}/> }
        {
            <div className="matchCardStart">
                { <button className="expetedButton" onClick={(e)=>setSeeExpect(true)}>My Expect</button>}
                { timeUp &&  <button className="expetedButton" onClick={()=>setStatePop(true)}>Match State</button>}
            
            </div>
    }       
       </div>
       {seeExpect && <PopExpectCard match = {match} setPop = {setSeeExpect} userExpect = {userExpect} />}
        { statePop && timeUp && <MatchState expected = {true} userExpect={userExpect}  setPop = {setStatePop} match={match}/>} 

    </div>
  )}></MatchCardProvider>
  )
}

export default Expected