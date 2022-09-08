import './matchcard.scss';
import {  createContext, useState } from 'react';
import PopMatchCard from '../popmatchcard/PopMatchCard';
import { globalUser } from '../../Context/HomeContext';
import TimeCounter from '../../TimeCounter';
import MatchResultComp from '../../adminPage/component/MatchCardComponent/MatchResultComp';
import MatchState from '../MatchState/MatchState';
import { MatchCardProvider } from '../../Context/MatchCardContext';
import { useNavigate, Link } from 'react-router-dom';


const MathchCard = ({match}) => {
    document.body.style.overflow = 'visible';
    const [pop,setPop] = useState(false);
    const [timeUp, setTimeUp] = useState(false); 
    const {isDark, auth} = globalUser(); 
    const navigate = useNavigate();

   
    const checkAuth = ()=>{
        if(auth)
            return setPop(true);
        navigate('/register/signin')
    }

    return ( 
    <MatchCardProvider match={match} childeren={
        ( 
            <>
            <div className={`matchCard ${isDark?'dark':null}`}>
                <div className="matchcardHeader-wrapper">
                    <div className="matchcardHeader">
                        <Link to={`/country/${match.firstCountry.countryName}`}>
                            <div className="matchCardCountry"> {/* country1.*/ }
                                <img src={match.firstCountry.logo} alt="" className="matchCardCountryImg" />
                                <span className='countryLabel'>{match.firstCountry.countryName}</span>
                            </div>
                        </Link>

                        <h2>VS</h2>
                        <Link  to={`/country/${match.secondCountry.countryName}`}>
                            <div className="matchCardCountry">
                                <img src={match.secondCountry.logo} alt={match.secondCountry.countryName} className="matchCardCountryImg" />
                                <span className='countryLabel'>{match.secondCountry.countryName}</span>
                            </div>
                        </Link>
                    </div>
                    <div className="round">{match.round}</div>
                </div>

                { !timeUp && <TimeCounter setTimeUp = {setTimeUp}  matchTime={match.matchTime}/>}

                {/* if the time is up the timer will display and you cant press the Expect button  */}
                {!timeUp && 
                    <div className="matchCardStart">
                        { <button onClick={checkAuth} className='matchCardbutton'>Expect</button>}
                    </div>
                } 
                    {!timeUp && pop && <PopMatchCard type="POST" pop={pop} setPop={setPop} dark = {isDark} match={match}/>}
                
                {timeUp && <MatchResultComp  time = {match.matchTime} 
                            FT={match.fullTime} 
                            result_1={match.firstCountry.result} 
                            result_2={match.secondCountry.result}
                            matchId = {match.matchId}
                            halfsTime = {match.time}
                            /> 
                }

            {timeUp &&
                    <div className="matchCardStart">
                        <button onClick={()=> setPop(true)} className='matchCardbutton'>Match State</button>
                        
                    </div>
            }
            </div>
            { pop && timeUp && <MatchState expected = {false}  setPop = {setPop} match={match}/>}   
            
        </>

    )}>
        </MatchCardProvider>
     );
}

export default MathchCard;