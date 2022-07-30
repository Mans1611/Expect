import React from 'react'
import { useEffect,useContext,useState } from 'react';
import { MatchCardContext } from '../../../component/matchcards/MatchCard';
import { MatchStateCentral } from '../../../Context/MatchCardContext';
import axios from 'axios';

const Minute = ({matchId,matchTime,min,setMin})=> {
    const MATCH_Time_IN_SECONDS = new Date(matchTime).getTime();
    const [refresh,setRefresh] = useState(0);
    const {state,dispatch,match} = MatchStateCentral();

    setInterval(()=>{
        setRefresh(refresh+1);
    },1000*60)

    useEffect( ()=>{ 
        const now = new Date().getTime();
        const passed = Math.floor((now-MATCH_Time_IN_SECONDS)/(1000*60)+1);
        setMin(passed - match.stoppingTime);
        
        if(min === 1){
            return async()=>{
                try{
                    console.log("passed ops");
                    dispatch({type : "Started",payload : 0})
                    const response = await axios.put(`/matches/editmatch/${matchId}`, {matchStatue : "GoingOn" });
                }catch(err){
                    console.log(err);
                }
            }
    }
    },[refresh])
    
      

    return (
    <div className="circle circleAdm">
        <span className="time">
            {
                (match.matchStatue === "Pasued")? '' : min
            }
            
            </span>
    </div>
  )
}

export default Minute;