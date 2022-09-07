import React, { useState } from 'react'
import MatchCardPhone from '../../matchcards/MatchCardPhone/MatchCardPhone';
import './nextMatches.scss';


const NextMatches = ({nextMatches}) => {
    const [timeUp,setTimeUp] = useState(false)
  return (
    <div className='NextMatches'>
        <div className="header">
            <h1>Next Matches</h1>
        </div>
        <div className="nextMatches-container">
            {
                nextMatches.length === 0 ? 
                <div className="noContent"> No UpComing Matches for this Team</div>
                :
                nextMatches.map((match,index)=>
                    <MatchCardPhone timeUp = {timeUp} setTimeUp = {setTimeUp}   key = {index} match = {match}/>
                    
                    )
            }
        </div>
    </div>
  )
}

export default NextMatches