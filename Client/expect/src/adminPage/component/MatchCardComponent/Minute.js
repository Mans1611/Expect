import React from 'react'
import { useEffect,useContext,useState } from 'react';
import { MatchCardContext } from '../../../component/matchcards/MatchCard';
import { MatchStateCentral } from '../../../Context/MatchCardContext';
import axios from 'axios';
import  io  from 'socket.io-client';
import Axios from '../../../Axios/axios';

const MINUTE = 1000*60 ; 
const socket =  io.connect('http://localhost:8000');

const Minute = ({matchTime,min,setMin,halfsTime})=> {
    
    const MATCH_Time_IN_SECONDS = new Date(matchTime).getTime();
    const [refresh,setRefresh] = useState(0);
    
    const store = MatchStateCentral();

    const interval = setInterval(()=>{
        setRefresh(refresh+1);
    },MINUTE)
    
    useEffect( ()=>{ 
        const now = new Date().getTime();
        
        if(halfsTime.secondHalf_start){
            const now = new Date().getTime();
            const Second_Half_StartTime = new Date(halfsTime.secondHalf_start).getTime();
            const passed = Math.floor((now- Second_Half_StartTime)/(MINUTE)+45);
            setMin(passed);
        }
        else{
            const passed = Math.floor((now-MATCH_Time_IN_SECONDS)/(MINUTE)+1);
             setMin(passed)

        }

        return ()=> clearInterval(interval)   
    },[refresh])

    useEffect(()=>{

        if(halfsTime.secondHalf_start){
            const now = new Date().getTime();
            const Second_Half_StartTime = new Date(halfsTime.secondHalf_start).getTime();
            console.log(Second_Half_StartTime);
            const passed = Math.floor((now- Second_Half_StartTime)/(MINUTE)+45);
            setMin(passed);
        }
        else{
            const now = new Date().getTime();
         
            const passed = Math.floor((now-MATCH_Time_IN_SECONDS)/(MINUTE)+1);
            
            setMin(passed);
        }

        // if(min >= 1 ) {
        //     try{
        //         store.dispatch({type : "Started"});
        //         socket.emit('updatingMatch',{
        //             matchStatue : "GoingOn",
        //             matchId : store.match.matchId
        //         })
        //     }   
        //     catch(err){
        //         console.log(err);
        //     }    
            
        // }  
    },[])



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