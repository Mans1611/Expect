import React from 'react'
import './selectplayercard.scss';

import AddIcon from '@mui/icons-material/Add';
const SelectPlayerCard = ({playersState,dispatchPlayer,countryOrder,playerOrder,order}) => {
  return (
    <div className={`SelectPlayerCard ${order === playersState.selected ? 'selected' : null}`}>
        <AddIcon/>
        <h2>Add Player</h2>
    </div>
  )
}

export default SelectPlayerCard