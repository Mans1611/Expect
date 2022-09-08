import React ,{useState} from 'react'
import { useEffect } from 'react';
import PlayerCard from '../popmatchcard/playercard/PlayerCard.js';

import { goalKeeper_postion , 
        DEF_Position , 
        MID_Position ,
        ATT_Position ,
        detectPosition
      } from '../popmatchcard/ReducerPlayer.js';

export default function PlayerCardRadio({player,countryOrder,auth,index,position}) {
  const [showPlayerState,setShowState] = useState(false);
  const [lock,setLock] = useState(false);
  
  
  useEffect(()=>{
    if(position){
      const player_Positin = detectPosition(player.position);
      if(position === player_Positin)
      setLock(true);
    }
    },[])

    return (
    <>
      <div  className="radioContaineter">
          {!lock && <input  onClick={()=>setShowState(true)} value={index}  type="radio" name={countryOrder}  id= {player.playerName} />}
          {lock && <input disabled onClick={()=>setShowState(true)} value={index}  type="radio" name={countryOrder}  id= {player.playerName} />}

          <label  htmlFor={player.playerName}>
              <PlayerCard lock = {lock} countryOrder={countryOrder} showPlayerState={showPlayerState}  player = {player} auth={auth} />
          </label>
      </div>
    </>
  )
}

