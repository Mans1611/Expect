import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from '../../Axios/axios'
import { globalUser } from '../../Context/HomeContext'
import SmallLaoding from '../loading/small.loading/smallLoading'
import PlayerCard from '../popmatchcard/playercard/PlayerCard'
import PlayerCardGridContainer from './PlayerCard/PlayerCardGridContainer'
import PlayerRowCard from './PlayerCard/PlayerRowCardContainer'
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
        <div className="headline">Recommendation</div>
        {/* <PlayerCardGridContainer Players = {Players}  isLoading = {isLoading}/> */}
        <PlayerRowCard isLoading={isLoading} Players = {Players}/>
    </div>
  )
}

export default PlayersToExpect