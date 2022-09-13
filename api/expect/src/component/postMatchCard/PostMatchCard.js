import './postMatchCard.scss';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import PublicIcon from '@mui/icons-material/Public';
import { globalUser } from '../../Context/HomeContext';
import PopMatchCard from '../popmatchcard/PopMatchCard';
import { useState } from 'react';
import MatchState from '../MatchState/MatchState';
const PostMatchCard = ({match,userExpect,userName}) => {
    const {userGlob} = globalUser();
    document.body.style.overflow = 'visible';
    
    const [pop,setPop] = useState(false);

    if(!match)
        return null;
    return ( 
        <>
        <div className="postMatchCard">
            <div className="matchHeader">
                <div className="country">
                    <img className='countryImage' src={match.firstCountry.logo} alt="" />
                    <label  className='countryLable'>{match.firstCountry.countryName}</label>
                </div>
                <div className="result">
                    <p>Final Result</p>
                    <span>{match.firstCountry.result} - {match.secondCountry.result}</span>
                </div>
                <div className="country">
                    <img className='countryImage' src={match.secondCountry.logo} alt="" />
                    <label  className='countryLable'>{match.secondCountry.countryName}</label>
                </div>
            </div>
           <div className="userExpect">
                <h3 className="yourExpect">Expected</h3>
                <p>Winner : {userExpect.winnerValue}</p>
                <p>Result : {userExpect.result1_value}  - {userExpect.result2_value}</p>
                <p>Your Match Points : {userExpect.userPoints} Pts</p>
           </div> 
           <div className="showFullWrapper">
                <button onClick ={()=>setPop(true)} className="showFull">Show Full Expect</button>
           </div>
        </div>
         {pop && <MatchState expected = {true}  userExpect={userExpect} match={match} setPop={setPop} /> }
        </>
        
     );
}
 
export default PostMatchCard;