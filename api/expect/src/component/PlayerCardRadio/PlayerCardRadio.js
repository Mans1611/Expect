import React ,{useState} from 'react'
import { useEffect } from 'react';
import { globalUser } from '../../Context/HomeContext.js';
import PlayerCard from '../popmatchcard/playercard/PlayerCard.js';

import { goalKeeper_postion , 
        DEF_Position , 
        MID_Position ,
        ATT_Position ,
        detectPosition
      } from '../popmatchcard/ReducerPlayer.js';

export default function PlayerCardRadio({player,countryOrder,auth,index,position,confirmedLinup}) {
  const [showPlayerState,setShowState] = useState(false);
  const [lock,setLock] = useState(false);
  const [goldenPlayer,setGoldenPlayer] = useState(false);
  const {isDark,user} = globalUser();

  useEffect(()=>{
    if(position){
      const player_Positin = detectPosition(player.position);
      if(position === player_Positin)
        setLock(true);
    }
    if(user.goldenPlayer?.player.playerName === player.playerName){
      setGoldenPlayer(true);
      setLock(true);
    }
    },[])


    return (
    <>
      <div  className="radioContaineter">
          {!lock ?
           <input  onClick={()=>setShowState(true)} value={index}  type="radio" name={countryOrder}  id= {player.playerName} /> 
          :
           <input disabled onClick={()=>setShowState(true)} value={index}  type="radio" name={countryOrder}  id = {player.playerName} />}
          {
            (goldenPlayer && lock) ?

            <label  htmlFor={player.playerName}>
                <PlayerCard confirmedLinup = {confirmedLinup} lock={true} goldenPlayer = {true} countryOrder={countryOrder} showPlayerState={showPlayerState}  player = {player} auth={auth} />
            </label>
            :
            <label  htmlFor={player.playerName}>
                <PlayerCard confirmedLinup = {confirmedLinup} lock = {lock} countryOrder={countryOrder} showPlayerState={showPlayerState}  player = {player} auth={auth} />
            </label>
          }
      </div>
    </>
  )
}

