import './topPlayers.scss';

import React, { useEffect,useState } from 'react'
import axios from 'axios';
import PlayerCard from '../popmatchcard/playercard/PlayerCard';
import SmallLaoding from '../loading/small.loading/smallLoading';
import { globalUser } from '../../Context/HomeContext';


const TopPlayers = () => {
    const [topPlayers,setTopPlayers] = useState([]);
    const [loading,setLoading] = useState(false);
    const {isDark} = globalUser();
    useEffect(()=>{
        return async()=>{
            try{
                const response = await axios.get('/statistics/topplayers');
                setTopPlayers(response.data);
                setLoading(false);

            }catch(err){
                console.log();
            }
        }
    },[])
  return (
    <div className={`TopPlayers ${isDark? 'dark' : ''}`}>
            <div className="topPlayersTitle">
                Top Players
            </div>
            {
                loading ? <SmallLaoding/> :
            <div className="playersContainer">
                {
                    topPlayers.map((player,index)=> <PlayerCard player = {player} key = {index} />) 
                }
                
            </div>
            }
    </div>
  )
}

export default TopPlayers