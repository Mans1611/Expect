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
                  Pick two players from both countries you expect to shine in this game.
                  Your first pick will be <span  className="highlighted">x1.5</span> and the second will be <span  className="highlighted">x1</span> 
                    <h2 className="points">Points Calculation : </h2>
                    <button onClick={()=>setPop(true)}>Show Points Calculation</button>
                </div>
            </div>

                <div className="card-face">
                    <div className="imgage-wrapper">
                        <img className='matchcard' src={player1} alt="" />
                        <img className='matchcard' src={player2} alt="" />
                    </div>
                    <h1>Select a Two Players From each caountry</h1>
                    <div className="text">Show More</div>
                </div>

            </div>
            
    </div>
  )
}

export default PlayerExpects