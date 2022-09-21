import React ,{useState} from 'react'
import { useEffect } from 'react';
import { globalUser } from '../../Context/HomeContext.js';
import PlayerCard from '../popmatchcard/playercard/PlayerCard.js';



export default function PlayerCardLinup({player,countryOrder,auth,index,position}) {

    return (

      <div  className="radioContaineter">
           <input  value={index}  type="checkbox" name={countryOrder}  id= {player.playerName} /> 
           <label  htmlFor={player.playerName}>
                <PlayerCard  countryOrder={countryOrder}   player = {player} auth={auth} />
            </label>

      </div>
  )
}

