
import './expect.Comp.scss';

import React ,{useContext, useState} from 'react'
import { globalUser } from '../../Context/HomeContext';
import TimeCounter from '../../TimeCounter';
import MatchResultComp from '../../adminPage/component/MatchCardComponent/MatchResultComp';
import Minute from '../../adminPage/component/MatchCardComponent/Minute';
import UpdatePopUp from '../UpdatePopUp/UpdatePopUp';
import PopMatchCard from '../popmatchcard/PopMatchCard';

const Expect = ({match,userExpect})=> {
    
    const {isDark} = globalUser();
    const [timeUp, setTimeUp] = useState(false);
    const [pop,setPop] = useState(false);

  return (

        <div className='expectComp'>
            <div className={`matchCard ${isDark?'dark':''}`}>
            <div className="matchcardHeader expectCard">
                <div className="matchCardCountry"> {/* country1.*/ }
                    <img src={match.firstCountry.logo}  alt={match.firstCountry.countryName} className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.firstCountry.countryName}</span>
                </div>
                
               { timeUp && <span className="result">{match.firstCountry.result}</span>}
                
                    { timeUp ?  match.fullTime ? <div className="clashHolder">FT</div> : <div className="clashHolder"><Minute matchTime={match.matchTime}/></div>  : <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime}/>}
                    
                
                {timeUp &&<span className="result">{match.firstCountry.result}</span>}
                <div className="matchCardCountry">
                    <img src={match.secondCountry.logo} alt={match.secondCountry.countryName} className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.secondCountry.countryName}</span>
                </div>
               
            </div>

            <div className="yourExpect">
                <h3>YourExpections</h3>
                <div className="winnerExpections"> Winner : <span className="userExpect"> {userExpect.winnerValue}</span>  </div>
                <div className="resultExpections">Result : <span className="userExpect"> {userExpect.result1_value}  :  {userExpect.result2_value} </span> </div>

            </div>
            
            
            {/* if the time is up the timer will display and you cant press the Expect button  */}
            
            
            {
                <div className="matchCardStart">
                    {timeUp ?
                        <button  className='matchCardbutton'>See MyExpect</button> 
                        : 
                        <button onClick={()=> {setPop(true)}}  className='matchCardbutton'>Edit Expect</button>
                    }
                </div>
        } 
                
            {/*timeUp && <MatchResultComp result_1={match.firstCountry.result} result_2={match.secondCountry.result}/> */}
        </div>

        {pop && <PopMatchCard userExpect={userExpect} match={match} setPop={setPop} /> }
        
        </div>
  )
}

export default Expect