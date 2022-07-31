import React from 'react'
import { useEffect,useContext,useState } from 'react';
import { MatchCardContext } from '../../../component/matchcards/MatchCard';
import { MatchStateCentral } from '../../../Context/MatchCardContext';
import axios from 'axios';
import  io  from 'socket.io-client';

const MINUTE = 1000*60 ; 
const socket =  io.connect('http://localhost:8000');
const Minute = ({matchTime,min,setMin})=> {
    const MATCH_Time_IN_SECONDS = new Date(matchTime).getTime();
    const [refresh,setRefresh] = useState(0);
    
    const store = MatchStateCentral();

    setInterval(()=>{
        setRefresh(refresh+1);
    },MINUTE)

    useEffect( ()=>{ 
        const now = new Date().getTime();
        const passed = Math.floor((now-MATCH_Time_IN_SECONDS)/(MINUTE)+1);
        setMin(passed - (store.match.stoppingTime));
        console.log(min);
        if(min === 1 ) {
            try{
                store.dispatch({type : "Started"});
                console.log(store.match.matchId);
                socket.emit('updatingMatch',{
                    matchStatue : "GoingOn",
                    matchId : store.match.matchId
                })
            }   
            catch(err){
                console.log(err);
            }    
            
        }  
        


    },[refresh])



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