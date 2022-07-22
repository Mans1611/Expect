import React ,{useState} from 'react'
import PlayerCard from '../popmatchcard/playercard/PlayerCard.js';

export default function PlayerCardRadio({player,countryOrder,auth}) {
  const [showPlayerState,setShowState] = useState(false);

  return (
    <div  className="radioContaineter">
        <input onClick={()=>setShowState(true) } value={player}  type="radio" name={countryOrder} id= {player.playerName} />
        <label  htmlFor={player.playerName}>
            <PlayerCard showPlayerState={showPlayerState}  player = {player} auth={auth} />
        </label>
    </div>
  )
}
