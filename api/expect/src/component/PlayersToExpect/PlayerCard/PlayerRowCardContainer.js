import './playerCardRow.scss';
import React from 'react'
import { globalUser } from '../../../Context/HomeContext';
import SmallLaoding from '../../loading/small.loading/smallLoading';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import PlayerProfilePop from '../../PlayerProfilePopUp/PlayerProfilePop';



const PlayerRowCard = ({Players,isLoading,dark}) => {

  const {isDark} = globalUser();
  const darkTheme = isDark || dark;
  
  return (
    <div className='PlayerRowCardContainer'>
      {isLoading ? <SmallLaoding/> :
        Players.length === 0  ? <div className="noContent">No Player Were Add</div> : 
        <>
        <div className={`playersrowcontainer ${darkTheme ? 'dark' : null}`}>
          <div className="rowHead row">
            
            <div className="item">Player Name</div>
            <div className="item">Country</div>
            <div className="item">Position</div>
            <div className="item">Next match</div>
            <div className="item">Total Points</div>
          </div>
          {Players.map((player,index)=> <PlayerRow key={index} player = {player}/>)}
        </div>
        </>
      }
    </div>
  )
}


const PlayerRow = ({player})=>{
  
  const [showPlayerProfile,setShowPlayerProfile] = useState(false);

  return (
        <>
          <div  onClick = {()=> setShowPlayerProfile(true)} className="row">
               
                <div className="item column">
                  <img src={player.playerImg} alt={player.playerImg} />
                  <span className="playerName">{player.playerName}</span>
                </div>
                <div className="item column">
                  <img className='country' src={player.country.logo} alt={player.country.logo} />
                  <span className="playerName">{player.country.countryName}</span>
                </div>
                <div className="item">{player.position}</div>
                <div className="item">{player.nextMatch}</div>
                <div className="item">{player.totalPoints}</div>
            </div>
            {showPlayerProfile && <PlayerProfilePop toFetch={true} player={player} setPop = {setShowPlayerProfile} />}
        </>
          )
}

export default PlayerRowCard