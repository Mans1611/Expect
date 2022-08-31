import React ,{useState} from 'react'
import PlayerCard from '../popmatchcard/playercard/PlayerCard.js';

export default function PlayerCardRadio({player,countryOrder,auth,index}) {
  const [showPlayerState,setShowState] = useState(false);
  return (
    <>
      <div  className="radioContaineter">
          <input onClick={()=>setShowState(true)} value={index}  type="radio" name={countryOrder}  id= {player.playerName} />
          <label  htmlFor={player.playerName}>
              <PlayerCard countryOrder={countryOrder} showPlayerState={showPlayerState}  player = {player} auth={auth} />
          </label>
      </div>
    </>
  )
}
