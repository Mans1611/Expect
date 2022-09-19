import React from 'react'
import Axios from '../../../../../Axios/axios';

const NextMatchStep = () => {

   
    return (
        <div  className="MatchStateSelect">
            <select id='matchStatus'>
                <option value={null}>null</option>
                <option>Start Match</option>
                <option>End First Half</option>
                <option>Start Second Half</option>
                <option>FullTime</option>
                <option>End Second Half</option>
                <option>Start First Extra Time</option>
                <option>End First Extra Time</option>
                <option>Start Second Extra Time</option>
                <option>End Second Extra Time</option>
                <option>Match Is Done</option>
            </select>
        </div>
  )
}

export default NextMatchStep