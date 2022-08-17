import React, { useState } from 'react'
import './extraStatistics.scss';
import SelectedState from './SelectedState/SelectedState';

const ExtraStatistics = () => {
    const [selectStatitics,setSelect] = useState("Top players");
    
  return (
    <div className='extraStatistics'>
        <div className="selectionWrapper">
            <select onChange={(e)=>setSelect(e.target.value)}>
                <option>Top players</option>
                <option>Top voted Players</option>
                <option>Top voted Games</option>
                <option>Top selected Countries</option>
            </select>
        </div>
        
        <SelectedState selected={selectStatitics}/>
        
    </div>
  )
}

export default ExtraStatistics