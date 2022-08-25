import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { globalUser } from '../../Context/HomeContext';
import SmallLaoding from '../loading/small.loading/smallLoading';
import PlayerCard from '../popmatchcard/playercard/PlayerCard';
import './topVotes.scss';

const TopVotes = () => {
    const [isLoading,setLoading] = useState(true);
    const [players,setPlayers] = useState([]);
    const {isDark} = globalUser();
    useEffect(()=>{
        let isSubscribe = true; 
        const fetchData = async ()=>{
            try{
                const {data} = await axios.get('/statistics/topvoted')    
                setPlayers(data);
                setLoading(false)
            }
            catch(err){
                console.log(err);
            }
        }
        fetchData();
        return  ()=>{
            isSubscribe = false
        }

    },[])

    
  return (
    <div className={`TopVotes ${isDark && 'dark'}`}>
        <div className="topVotesHeader">
            <h1>Top Votes</h1>    
        </div>
        <div className="playersContainer">
            { isLoading? <SmallLaoding/> : 
                players.map((player,index)=> <PlayerCard key={index} player = {player} />)
            }
        </div>   
    </div>
  )
}

export default TopVotes