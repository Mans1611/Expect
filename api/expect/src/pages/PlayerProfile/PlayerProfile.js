import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'

const PlayerProfile = () => {
    const {playerName,countryName} = useParams();
    console.log(countryName,playerName);
  return (
    <div>PlayerProfile</div>
  )
}

export default PlayerProfile