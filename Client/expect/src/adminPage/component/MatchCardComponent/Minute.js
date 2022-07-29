import React from 'react'
import { useEffect,useContext,useState } from 'react';
import { MatchCardContext } from '../../../component/matchcards/MatchCard';

import axios from 'axios';

const Minute = ({matchId,matchTime,min,setMin})=> {
    const MATCH_Time_IN_SECONDS = new Date(matchTime).getTime();
    const [refresh,setRefresh] = useState(0);


    setInterval(()=>{
        setRefresh(refresh+1);
    },1000*60)

    useEffect( ()=>{ 
        const now = new Date().getTime();
        const passed = Math.floor((now-MATCH_Time_IN_SECONDS)/(1000*60));
        setMin(passed);
        if(min === 1){
            return async()=>{
                try{
                    await axios.put(`/matches/editmatch/${matchId}`, {started : true});
                    console.log("Done");
                }catch(err){
                    console.log(err);
                }
            }
        }
        
    },[refresh])
    
      

    return (
    <div className="circle circleAdm">
        <span className="time">{min}</span>
    </div>
  )
}

export default Minute;