import './playerstoexpect.scss'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from '../../Axios/axios'
import { globalUser } from '../../Context/HomeContext'

import PlayerRowCard from './PlayerCard/PlayerRowCardContainer'
const PlayersToExpect = ({dark}) => {

    const {isDark} = globalUser();
    const darkTheme = isDark || dark;
    const [Players,setPlayers] = useState([]);
    const [isLoading,setLoading] = useState(true);

    useEffect(()=>{
        let isSubscribe = true;
        const fetchPlayers = async ()=>{
            try{
                const {data} = await Axios.get('/statistics/getplayerstoExpect');
                if(isSubscribe)
                    setPlayers(data);
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }
        if(isSubscribe) fetchPlayers();

        return ()=> isSubscribe = false;
        
    },[])

  return (
    <div className={`playersToExpect ${darkTheme? 'dark' : null}`}>
        <div className="headline">Recommendation</div>
        {/* <PlayerCardGridContainer Players = {Players}  isLoading = {isLoading}/> */}
        <PlayerRowCard dark = {darkTheme}   isLoading={isLoading} Players = {Players}/>
    </div>
  )
}

export default PlayersToExpect