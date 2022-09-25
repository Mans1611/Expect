import React from 'react'
import { useEffect,useContext,useState } from 'react';
import { MatchCardContext } from '../../../component/matchcards/MatchCard';
import { MatchStateCentral } from '../../../Context/MatchCardContext';

const MINUTE = 1000*60 ; 


const Minute = ({matchId,matchTime,min,setMin,halfsTime})=> {
    const MATCH_Time_IN_SECONDS = new Date(matchTime).getTime();
    const [refresh,setRefresh] = useState(0);
    
    const store = MatchStateCentral();

    const interval = setInterval(()=>{
        setRefresh((r)=>r+1);
    },MINUTE)
    clearInterval(interval)
    
    useEffect( ()=>{ 

        const now = new Date().getTime();
        let passed = 0;
        let isSubscribe = true ;

         if (halfsTime.secondExtra_start){
            const now = new Date().getTime();
            const Second_Half_StartTime = new Date(halfsTime.secondExtra_start).getTime();
            passed = Math.floor((now- Second_Half_StartTime)/(MINUTE)+106);
        }
        else if (halfsTime.firstExtra_start){
            const now = new Date().getTime();
            const Second_Half_StartTime = new Date(halfsTime.firstExtra_start).getTime();
            passed = Math.floor((now- Second_Half_StartTime)/(MINUTE)+91);
        }
        else if(halfsTime.secondHalf_start){
            const now = new Date().getTime();
            const Second_Half_StartTime = new Date(halfsTime.secondHalf_start).getTime();
            passed = Math.floor((now- Second_Half_StartTime)/(MINUTE)+46);
        }
        else{
            passed = Math.floor((now-MATCH_Time_IN_SECONDS)/(MINUTE)+1);
        }

        if(isSubscribe)
            setMin(passed);

        return ()=> {
            clearInterval(interval)  
            isSubscribe = false;
        } 

    },[refresh])

    // useEffect(()=>{

    //     if(halfsTime.secondHalf_start){
    //         const now = new Date().getTime();
    //         const Second_Half_StartTime = new Date(halfsTime.secondHalf_start).getTime();
    //         const passed = Math.floor((now- Second_Half_StartTime)/(MINUTE)+46);
    //         setMin(passed);
    //     }
    //     else{
    //         const now = new Date().getTime();
    //         const passed = Math.floor((now-MATCH_Time_IN_SECONDS)/(MINUTE)+1);
            
    //         setMin(passed);
    //     }

       
    // },[])



    return (
    <div className="circle circleAdm">
        <span className="time">
            {
                (store.match.matchStatue !== "GoingOn") ? store.match.matchStatue : min
            }
            
            </span>
    </div>
  )
}

export default Minute;