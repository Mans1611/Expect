import React, { useEffect, useState } from 'react';
import Axios from '../../../Axios/axios';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import MatchCardAdm from '../MatchCardAdm/MatchCardAdm';
import MatchCard_Dashboard from './MatchCard_Dashboard';
import { MatchCardProvider } from '../../../Context/MatchCardContext';
import './todayMatches.scss';

const TodayMatches = () => {
    const date = `${new Date().getMonth() + 1},${(new Date().getDate()<10) ? `0${new Date().getDate()}`: `${new Date().getDate()}`},${new Date().getFullYear()}`
    const [todayMatches,setTodyMatches] = useState([]);
    const [isLoading,setLoading] = useState(true);
    useEffect(()=>{
        let isSubscribe = true;

        const fetchTodayMatches = async()=>{
            const {data} = await Axios.get(`/matches/?date=${date}`);
            if(isSubscribe)
                setTodyMatches(data);
            setLoading(false);
        }
        
        fetchTodayMatches();

        return ()=>isSubscribe = false;
    })
  return (
    <div className='todayMatches-container'>
        <h1>Today Matches</h1>
        <div className="matches-wrapper">
            {isLoading ? <SmallLaoding/> : 
                (todayMatches.length === 0) ?  <div className="noContent">No Matches Today</div> :
                todayMatches.map((match,index,)=> <MatchCardProvider match={match} childeren = {<MatchCard_Dashboard key={index} match={match}/>}/> )
            }
        </div>
    </div>
  )
}

export default TodayMatches;