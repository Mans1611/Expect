import './playerCardRow.scss';
import React from 'react'
import { globalUser } from '../../../Context/HomeContext';
import SmallLaoding from '../../loading/small.loading/smallLoading';
const PlayerRowCard = ({Players,isLoading,dark}) => {

  const {isDark} = globalUser();
  const darkTheme = isDark || dark
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
          <PlayerRow Players = {Players}/>
        </div>
       
        </>
      }
    </div>
  )
}


const PlayerRow = ({Players})=>{
    return (
      Players.map((player,index)=>{
          return(
            <div key={index} className="row">
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
          )
      })
    )
}

export default PlayerRowCard