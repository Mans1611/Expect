import React, { useState } from 'react'
import PlayerChoose from '../../../images/playerChoose.gif';

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
                    <div className="image-wrapper">
                      <img src={PlayerChoose} />
                    </div>
                    <h1>Select a Two Players From each caountry</h1>
                    <div className="text">Hover To Show More</div>
                </div>

            </div>
            
    </div>
  )
}

export default PlayerExpects