
import './expect.Comp.scss';

import React ,{useContext, useEffect, useState} from 'react'
import { globalUser } from '../../Context/HomeContext';
import TimeCounter from '../../TimeCounter';
import Minute from '../../adminPage/component/MatchCardComponent/Minute';
import PopMatchCard from '../popmatchcard/PopMatchCard';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import MatchState from '../MatchState/MatchState';
import Axios from '../../Axios/axios';

const Expect = ({match,userExpect,setUserExpections})=> {
    document.body.style.overflow = "visible";
    
    if(!userExpect)
        return;
    else{
        const {isDark,userGlob} = globalUser();
        const [timeUp, setTimeUp] = useState(false);
        const [pop,setPop] = useState(false);
        const [min,setMin] = useState(1);
        const [showDelete,setShowDelete] = useState(false);
        const [showState,setShowState] = useState(false);

        
        const handldeDeleteExpect = async(e) =>{
            e.preventDefault();
            try{
                const response = await Axios.delete(`/expects/deleteExpect/${userGlob}/${match.matchId}`)
                setUserExpections(response.data);
            }catch(err){
                console.log(err);
            }
            
    }
  return (

        <div className='expectComp'>
            <div className={`matchCard ${isDark?'dark':''}`}>
            
            <div className="matchcardHeader expectCard">
                <div className="matchCardCountry"> {/* country1.*/ }
                    <img src={match.firstCountry.logo}  alt={match.firstCountry.countryName} className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.firstCountry.countryName}</span>
                </div>
               { timeUp && <span className="result">{match.firstCountry.result}</span>}
                
                { timeUp ?  match.fullTime ? <div className="clashHolder">FT</div> : <div className="clashHolder"><Minute halfsTime={match.time} min = {min} setMin={setMin} matchTime={match.matchTime}/></div>  : <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime}/>}
                    
                
                {timeUp &&<span className="result">{match.secondCountry.result}</span>}
                <div className="matchCardCountry">
                    <img src={match.secondCountry.logo} alt={match.secondCountry.countryName} className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.secondCountry.countryName}</span>
                </div>
            </div>
          
            <div className={`yourExpect ${isDark?'dark':''}`}>
                <h3 className="yourexpection">Your Expections</h3>
                <div className="ExpectionsContent"> Winner : <span className="userExpect"> {userExpect.winnerValue}</span>  </div>
                <div className="ExpectionsContent"><ScoreboardIcon/> Result :  <span className="userExpect"> {userExpect.result1_value}  -  {userExpect.result2_value} </span> </div>
            </div>
            
            
            {/* if the time is up the timer will display and you cant press the Expect button  */}
            
            
            {
                <div className="matchCardStart">
                    {timeUp ?
                        <button onClick={()=> setShowState(true)}  className='matchCardbutton'>Expect Points</button> 
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
            } 
                
            
            {/*timeUp && <MatchResultComp result_1={match.firstCountry.result} result_2={match.secondCountry.result}/> */}
            <div className="matchPoints">
                Match Points : <span>{userExpect.userPoints} PT </span>
            </div>
        </div>
            {/* so if the deadline did not hit so you will be able to update match PopMatchCard*/}
            {/* so if the deadline did  hit so you will be able to see the match state*/}
       
        
        {showState && <MatchState expected = {true} userExpect={userExpect} match = {match} setPop = {setShowState}/>}
        </div>
  )
}
}

export default Expect