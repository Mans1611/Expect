import './postMatchCard.scss';

import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import PublicIcon from '@mui/icons-material/Public';
import { globalUser } from '../../Context/HomeContext';
import PopMatchCard from '../popmatchcard/PopMatchCard';
import { useState } from 'react';
import MatchState from '../MatchState/MatchState';
import MatchResultComp from '../../adminPage/component/MatchCardComponent/MatchResultComp';
import TimeCounter from '../../TimeCounter';
import { MatchCardProvider } from '../../Context/MatchCardContext';
import PopSubsHT from '../popmatchcard/PopSubsHT';
const PostMatchCard = ({match,userExpect,userName}) => {
    const {userGlob,token} = globalUser();
    document.body.style.overflow = 'visible';
    
    const [matchStatePop,setMatchStatePop] = useState(false);
    const [timeUp, setTimeUp] = useState(false); 
    const [showDelete,setShowDelete] = useState(false);
    const [popUpdateExpect,setPopUpdateExpect] = useState(false);
    const [showSubPop,setShowSubPop] = useState(false);


    if(!match)
        return null;


    const handldeDeleteExpect = async(e) =>{
        e.preventDefault();
        try{
            const response = await Axios.delete(`/expects/deleteExpect/${userGlob}/${match.matchId}`,{
                headers : {
                    token
                }
            })
            setUserExpections(response.data);
        }catch(err){
            console.log(err);
        }
            
    }
   
    return ( 
        <MatchCardProvider match = {match} childeren = {(
    <>
            <div className="postMatchCard">
                <div className="matchHeader">
                    <div className="country">
                        <img className='countryImage' src={match.firstCountry.logo} alt="" />
                        <label  className='countryLable'>{match.firstCountry.countryName}</label>
                    </div>
                    <div className="result">
                        {
                            timeUp ?
                            match.fullTime ?
                                    <>
                                        <p>Final Result</p>
                                        <span>{match.firstCountry.result} - {match.secondCountry.result}</span> 
                                    </>
                                        : 
                                    <MatchResultComp halfsTime={match.time} matchId = {match.matchId} FT = {match.fullTime} time = {match.matchTime} result_1={match.firstCountry.result} result_2={match.secondCountry.result}/>
                                :
                                <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime} matchId = {match.matchId}/>
                                
                            }
                    </div>
                    <div className="country">
                        <img className='countryImage secondImg' src={match.secondCountry.logo} alt="" />
                        <label  className='countryLable'>{match.secondCountry.countryName}</label>
                    </div>
                </div>
            <div className="userExpect">
                    <h3 className="yourExpect">Your Expectation</h3>
                    <p>Winner : {userExpect.winnerValue}</p>
                    <p>Result : {userExpect.result1_value}  - {userExpect.result2_value}</p>
                    <p>Your Match Points : {userExpect.userPoints} Pts</p>
            </div> 
            <div className="showFullWrapper">
            {timeUp ?
                        <>
                            <button onClick={()=> setMatchStatePop(true)}  className='matchCardbutton'>Expect Points</button> 
                            {match.matchStatue === "HT" && <button className='matchCardbutton' onClick={()=> setShowSubPop(true)}>Substitue Player</button>}
                        </>
                        : 
                        <>
                        { showDelete ? 
                        <>
                            <button onClick={()=>setShowDelete(false)} className='matchCardbutton'>Cancel </button>
                            <button onClick={handldeDeleteExpect} className='deleteExpect'>Confirm Delete</button>
                         </>
                         :
                            <>
                            <button onClick={()=>setShowDelete(true)} className=" deleteExpect">Delete Expect</button>
                            <button onClick={()=> {setPop(true)}}  className='matchCardbutton'>Edit Expect</button>
                            </>
                        }
                        </>
                    }         
            
            </div>
            </div>


            {matchStatePop && <MatchState expected = {true}  userExpect={userExpect} match={match} setPop={setMatchStatePop} /> }
            {popUpdateExpect && <PopMatchCard userExpect={userExpect} match={match}  setPop = {setPopUpdateExpect} />}
            {showSubPop && <PopSubsHT match={match} setPop = {setShowSubPop} userExpect = {userExpect}/>}
        </>
        )}>

        </MatchCardProvider>

        
     );
}
 
export default PostMatchCard;