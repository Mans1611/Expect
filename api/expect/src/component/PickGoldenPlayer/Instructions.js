import React from 'react'
import { handleNext } from './utilis/handleNext'
import PlayersImg from '../../images/glodenPlayer.png' ;
const Instructions = ({setSkip}) => {
  return (
        <div id='instructions' className="instructions">
            <div className="header">
                <img src={PlayersImg} />
            </div>
            <div className="content-body">
                <h1 className="title">Pick Your  Golden Player</h1>
               
                <p>- Pick any Player from any country, this player's points will be calculated to your Total Points and it will be multiplied by <span>X2 </span>, so when this player plays his match you will not have to pick him, as his points already will be transfered to you. </p>
                    <p>You can change your golden Player jsut <span>
                    once </span>  then you can not change him again, do pick him carefully.</p>   
            </div>
            <div className="button-wrapper-golden">
                <button onClick={()=>setSkip(true)} className="back">Skip</button>
                <button onClick={()=>handleNext('instructions','chooseCountry-container')} className="next">Next</button>
            </div>
        </div>
  )
}

export default Instructions