import React from 'react'
import matchcard from '../../../images/matchcard.png';
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
                <div className="imgage-wrapper">
                    <img className='matchcard' src={matchcard} alt={matchcard} />
                </div>
                <h1>Pick A Match & Expect Winner</h1>
                <div className="text">Show More</div>
            </div>
           
        </div>
    </div>
  )
}

export default WinnerExpect