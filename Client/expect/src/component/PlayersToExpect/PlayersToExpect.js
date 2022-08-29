import React, { useEffect } from 'react'
import { useState } from 'react'
import Axios from '../../Axios/axios'
import { globalUser } from '../../Context/HomeContext'
import SmallLaoding from '../loading/small.loading/smallLoading'
import PlayerCard from '../popmatchcard/playercard/PlayerCard'
import PlayerCardGridContainer from './PlayerCard/PlayerCardGridContainer'
import PlayerRowCard from './PlayerCard/PlayerRowCardContainer'
import './playerstoexpect.scss'
const PlayersToExpect = ({dark,setPlayers,Players,isLoading,setLoading}) => {

    const {isDark} = globalUser();
    const darkTheme = isDark || dark;
    
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
    <div className={`playersToExpect ${darkTheme? 'dark' : null}`}>
        <div className="headline">Recommendation</div>
        {/* <PlayerCardGridContainer Players = {Players}  isLoading = {isLoading}/> */}
        <PlayerRowCard dark = {darkTheme}   isLoading={isLoading} Players = {Players}/>
    </div>
  )
}

export default PlayersToExpect