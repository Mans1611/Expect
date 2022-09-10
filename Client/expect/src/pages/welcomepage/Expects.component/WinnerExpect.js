import React from 'react'
import MathchCard from '../../../component/matchcards/MatchCard';
import {match} from '../fakeData';
import Winner from '../../../images/winner.gif';
const WinnerExpect = () => {
  return (
    <div className="card-wrapper">
        <div className="step"> <span>1</span> </div>
        <div className="card flipcard">
            <div className="card-back">
                <div className="rules expects">
                    Expect the Winner of your Choosing game, and take points from it. Since it is the easier than the next match expects, it has a fewer Points.
                    <h2 className="points">Points : </h2>
                    <p>If you expected the winner correctly <span className="green">(2PT)</span> </p>
                    <p>If you expected  a <span className="highlighted">
                    Draw</span> <span className="green">(3PT)</span> </p>
                </div>
            </div>
            <div className="card-face">
            <div className="image-wrapper">
                  <img src = {Winner}/>
               </div>
                <h1>Pick A Match & Expect Winner</h1>
                <div className="text">Hover To Show More</div>
            </div>
           
        </div>
    </div>
  )
}

export default WinnerExpect