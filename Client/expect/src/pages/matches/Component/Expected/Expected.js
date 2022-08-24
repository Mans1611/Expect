import React  from 'react'
import { useContext, useState } from 'react';
import { globalUser } from '../../../../Context/HomeContext';
import './expected.scss';
import TimeCounter from '../../../../TimeCounter';
import MatchResultComp from '../../../../adminPage/component/MatchCardComponent/MatchResultComp';
import { MatchCardProvider } from '../../../../Context/MatchCardContext';
import PopMatchCard from '../../../../component/popmatchcard/PopMatchCard';
import PopExpectCard from '../../../../component/popmatchcard/PopExpectCard';
const Expected = ({match,userExpect})=> {
    
    const {isDark} = globalUser();
    const [timeUp, setTimeUp] = useState(false); 
    const [seeExpect,setSeeExpect] = useState(false);
  return (
    <MatchCardProvider match = {match} childeren = {(

      <div className='expectedContainer'>
        <div className={`matchCard ${isDark?'dark':''}`}>
        <div className="matchcardHeader-wrapper">
          <div className="matchcardHeader">
            <div className="matchCardCountry"> {/* country1.*/ }
              <img src={match.firstCountry.logo} alt="" className="matchCardCountryImg" />
              <span className='countryLabel'>{match.firstCountry.countryName}</span>
            </div>
            <h2>VS</h2>
              <div className="matchCardCountry">
                  <img src={match.secondCountry.logo} alt="" className="matchCardCountryImg" />
                  <span className='countryLabel'>{match.secondCountry.countryName}</span>
              </div>
          </div>
          <div className="round">{match.round}</div>
        </div>

        { !timeUp &&
           <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime}/>
        }

        {/* if the time is up the timer will display and you cant press the Expect button  */}
        {timeUp && <MatchResultComp matchId = {match.matchId} FT = {match.fullTime} time = {match.matchTime} result_1={match.firstCountry.result} result_2={match.secondCountry.result}/> }
        {
            <div className="matchCardStart">
                { <button onClick={(e)=>setSeeExpect(true)} className='matchCardbutton'>My Expect</button>}
            </div>
    }       
       </div>
       {
        seeExpect && <PopExpectCard match = {match} setPop = {setSeeExpect} userExpect = {userExpect} />
       }

    </div>
  )}></MatchCardProvider>
  )
}

export default Expected