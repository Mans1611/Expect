import React, {useState} from 'react'
import TimeCounter from '../../../TimeCounter';
import MatchResultComp from '../MatchCardComponent/MatchResultComp';
const MatchCard_Dashboard = ({match}) => {

    const [timeUp, setTimeUp] = useState(false); 
    const matchTime = match.matchTime.slice(11,16);
    
  return (
    <div className='MatchCard_Dashboard'>
        <div className="header-wrapper">

        <div className="matchcardHeader">
            <div className="matchCardCountry"> {/* country1.*/ }
                <img src={match.firstCountry.logo} alt={match.firstCountry.countryName} className="matchCardCountryImg" />
                <span className='countryLabel'>{match.firstCountry.countryName}</span>
            </div>
            VS
            <div className="matchCardCountry">
                <img src={match.secondCountry.logo} alt= {match.secondCountry.countryName} className="matchCardCountryImg" />
                <span className='countryLabel'>{match.secondCountry.countryName}</span>
            </div>
        </div>
        {timeUp && <MatchResultComp  time = {match.matchTime} 
                            FT={match.fullTime} 
                            result_1={match.firstCountry.result} 
                            result_2={match.secondCountry.result}
                            /> 
                }
        { !timeUp && <div className="matchTime">Time : <span className="time">{matchTime}</span></div>}
        </div>

    </div>
  )
}

export default MatchCard_Dashboard