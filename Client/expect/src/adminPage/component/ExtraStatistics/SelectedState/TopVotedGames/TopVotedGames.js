import React, { useState,useEffect } from 'react'
import Axios from '../../../../../Axios/axios';
import SmallLaoding from '../../../../../component/loading/small.loading/smallLoading';
import MatchAdmin_Row from './MatchAdmin_Row';
import './topvotedgame.scss';
const TopVotedGames = () => {
  const [isLoading,setLoading] = useState(true);
  const [topGames,setTopGames] = useState([]);

  useEffect(()=>{
    return async()=>{
      const {data} = await Axios.get('/statistics/topvotedgames');
      setTopGames(data);
      setLoading(false);
    }
  })
  
  return (
    <div className='standing-container topVotedGames'>
        <h1 className="title">Top Voted Games</h1>
        <div className="standing-header row games">
            <span className="field">No</span>
            <span className="field">Match_id</span>
            <span className="field">Match</span>
            <span className="field">Status</span>
            <span className="field">Total Votes</span>
        </div>
        {
          isLoading ? <SmallLaoding/> : 
            <>
            {
              topGames.map((game,index)=><MatchAdmin_Row key={index} match={game} order = {index+1}/>)
            }
            </>
        }
        
    </div>
  )
}

export default TopVotedGames