import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { globalUser } from '../../Context/HomeContext';
import './playerprofile.scss';
import PlayerStatistics from './PlayerStatistics';

const PlayerProfilePop = ({player,setPop}) => {
    
    const {isDark} = globalUser()
    
    const hidePop = (e)=>{
       
        if(e.target.tagName === "svg")
            return setPop(false)
        if(e.target.className.includes('playerProfile')){
            setPop(false);
        }
    }
    let Player = null
    if(player.players){
        Player = {
            countryName:player.countryName,
            logo : player.logo,
            ...player.players
        }
    }else{
        Player = {...player}
    }

  return (
    <div  onClick={hidePop}  className="popMatchFullPage playerProfile">
        <div className={`popMatchContainer ${isDark && 'dark'}`}>
            <CloseIcon onClick={()=> setPop(false)} className='Popicon'/>
            <div className="player-header">
                <div className="playerImg">
                    <img src={Player.playerImg} alt={Player.playerName} />
                </div>
                <div className="player-personl-details">
                    <h1 className="playerName">{Player.playerName}</h1>
                    <h2>{Player.position}</h2>
                </div>
                <div className="player-country">
                    <img src={Player.logo} />
                    <h2>{Player.countryName}</h2>
                </div>
            </div>
            <div className="player-content-body">
                <h1>Player Details</h1>
                <PlayerStatistics player={Player}/>
            </div>
        </div>
    </div>
  )
}

export default PlayerProfilePop