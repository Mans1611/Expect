import React, { useState } from 'react'

import player1 from '../../../images/player1.png'
import player2 from '../../../images/player2.png';
import PlayerPointsPop from './PlayerPointsPop';

const PlayerExpects = ({setPop}) => {


  return (
    <div className="card-wrapper">
            <div className="step"> <span>3</span></div>
            
            <div className="card flipcard">
            <div className="card-back">
                <div className="rules expects players">
                  Pick one Player from both countries you expect to shine in this game  
                    <h2 className="points">Points Calculation : </h2>
                    <button onClick={()=>setPop(true)}>Show Points Calculation</button>
                </div>
            </div>

                <div className="card-face">
                    <div className="imgage-wrapper">
                        <img className='matchcard' src={player1} alt="" />
                        <img className='matchcard' src={player2} alt="" />
                    </div>
                    <div className="text">Select  Player From Both Countries</div>
                </div>

            </div>
            
    </div>
  )
}

export default PlayerExpects