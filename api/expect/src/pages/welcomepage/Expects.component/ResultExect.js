import React from 'react'
import Matchresult from '../../../images/result.gif';
import { handleHover } from '../handleHover';

const ResultExect = () => {
  
  

  return (
    <div className="card-wrapper">
        <div className="step"> <span> 2 </span> </div>
        <div  className="card flipcard">
            <div className="card-back">
                <div className="rules expects">
                  Try to expect the result of the game, you will get even if you are close to the result points of you 
                    <h2 className="points">Points Calculation : </h2>
                    <p>If you expected the result totaly correctly <span className="green">(5PT)</span> </p>
                    <p>If you were close by <span className="highlighted">
                    1 goal </span> difference <span className="green">(3PT)</span> </p>
                    <p>If you were close by <span className="highlighted">
                    2 goals </span> difference <span className="green">(1PT)</span> </p>
                </div>
            </div>
            <div className="card-face">
               <div className="image-wrapper">
                  <img src = {Matchresult}/>
               </div>
                <h1>Try to Expect The Match Result</h1>
                <div onClick={()=>handleHover(1)} className="text">Click To Show More</div>
            
            </div>
        </div>
    </div>
  )
}

export default ResultExect