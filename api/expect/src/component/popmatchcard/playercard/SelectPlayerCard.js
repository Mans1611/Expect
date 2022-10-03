import React from 'react'
import './selectplayercard.scss';
import AddIcon from '@mui/icons-material/Add';


const SelectPlayerCard = ({playersState,dispatchPlayer,countryOrder,playerOrder,order}) => {
 console.log(countryOrder,playerOrder);
  return (
    <div onClick={()=>{dispatchPlayer({type : `show${countryOrder}${playerOrder}`}); setTimeout(scrollPlyers,0)}}  className={`SelectPlayerCard ${order === playersState.selected ? 'selected' : null}`}>
        <AddIcon/>
        <h2>Add Player</h2>
        <h4>{order === 1 || order === 3 ? "Player Points x1.5" : "Player Points x1" }</h4>
    </div>
  )
}

export default SelectPlayerCard ;