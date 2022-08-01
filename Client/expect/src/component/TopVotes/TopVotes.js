import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import SmallLaoding from '../loading/small.loading/smallLoading';
import PlayerCard from '../popmatchcard/playercard/PlayerCard';
import './topVotes.scss';

const TopVotes = () => {
    const [isLoading,setLoading] = useState(true);
    const [players,setPlayers] = useState([]);
    useEffect(()=>{

        return async ()=>{
            try{
                const {data} = await axios.get('/statistics/topvoted')    
                setPlayers(data);
                setLoading(false)
            }
            catch(err){
                console.log(err);
            }
        }

    },[])
  return (
    <div className='TopVotes'>
        <div className="topVotesHeader">
            <h1>Top Votes</h1>    
        </div>
        <div className="topVotedPlayersContainer">
            { isLoading? <SmallLaoding/> : 
                players.map((player,index)=> <PlayerCard key={index} player = {player} />)
            }
        </div>   
    </div>
  )
}

export default TopVotes