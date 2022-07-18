import React from 'react'
import { useEffect,useContext,useState } from 'react';
import { MatchCardContext } from '../../../component/matchcards/MatchCard';



const Minute = ()=> {
    const {matchTime} = useContext(MatchCardContext);
    const MATCH_Time_IN_SECONDS = new Date(matchTime).getTime();
    const [min,setMin] = useState(1);
    const [refresh,setRefresh] = useState(0)
    setInterval(()=>{
        setRefresh(refresh+1);
    },1000*60)

    useEffect(()=>{ 
        const now = new Date().getTime();
        const passed = Math.floor((now-MATCH_Time_IN_SECONDS)/(1000*60));
        setMin(passed); 
    },[refresh])

    return (
    <div className="circle">
        <span className="time">{min}</span>
    </div>
  )
}

export default Minute;