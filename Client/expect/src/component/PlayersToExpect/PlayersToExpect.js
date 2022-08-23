import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from '../../Axios/axios'
import { globalUser } from '../../Context/HomeContext'
import SmallLaoding from '../loading/small.loading/smallLoading'
import PlayerCard from '../popmatchcard/playercard/PlayerCard'
import './playerstoexpect.scss'
const PlayersToExpect = () => {
    const [isLoading,setLoading] = useState(true);
    const [Players,setPlayers] = useState([]);
    const {isDark} = globalUser();

    useEffect(()=>{
        return async()=>{
            try{
                const {data} = await Axios.get('/statistics/getplayerstoExpect');
                setPlayers(data);
                setLoading(false);
               
            }catch(err){
                console.log(err);
            }
        }
    },[])

  return (
    <div className={`playersToExpect ${isDark? 'dark' : null}`}>
        <div className="headline">Players To Expect</div>
        <div className="playersContainer">
            {isLoading ? <SmallLaoding/> : 
                Players.length === 0 ? <div className="noContent">No Player Were Add</div> : 
                Players.map((player,index)=> <PlayerCard key={index} player={player}/>)
            
        }
        </div>

    </div>
  )
}

export default PlayersToExpect