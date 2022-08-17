import {  createContext, useState } from 'react';
import PopMatchCard from '../popmatchcard/PopMatchCard';
import './matchcard.scss';
import { globalUser } from '../../Context/HomeContext';
import TimeCounter from '../../TimeCounter';
import MatchResultComp from '../../adminPage/component/MatchCardComponent/MatchResultComp';
import MatchState from '../MatchState/MatchState';
import { MatchCardProvider } from '../../Context/MatchCardContext';


const MathchCard = ({match}) => {

    const [pop,setPop] = useState(false);
    const [timeUp, setTimeUp] = useState(false); 
    const {isDark} = globalUser(); 
   
    return ( 
    <MatchCardProvider match={match} childeren={

        (
            
            <>
        
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
                        { <button onClick={()=>setPop(!pop)} className='matchCardbutton'>Expext</button>}
                    </div>
                } 
                    {!timeUp && pop && <PopMatchCard type="POST" pop={pop} setPop={setPop} dark = {isDark} match={match}/>}
                
                {timeUp && <MatchResultComp  time = {match.matchTime} 
                            FT={match.fullTime} 
                            result_1={match.firstCountry.result} 
                            result_2={match.secondCountry.result}
                            /> 
                }

            {timeUp &&
                    <div className="matchCardStart">
                        <button onClick={()=> setPop(true)} className='matchCardbutton'>Match State</button>
                    </div>
            }
            </div>
            { pop && timeUp && <MatchState setPop = {setPop} match={match}/>}   
        </>

    )}>
        </MatchCardProvider>
     );
}

export default MathchCard;