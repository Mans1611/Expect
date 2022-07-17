import React from 'react'
import PlayerCard from '../popmatchcard/playercard/PlayerCard.js';

export default function PlayerCardRadio({player,countryOrder}) {
  return (
    <div  className="radioContaineter">
        <input  type="radio" name={countryOrder} id= {player.playerName} />
        <label  htmlFor={player.playerName}>
            <PlayerCard  player = {player}/>
        </label>
    </div>
  )
}
