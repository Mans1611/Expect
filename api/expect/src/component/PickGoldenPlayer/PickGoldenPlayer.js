import React ,{useEffect, useState} from 'react'
import { globalUser } from '../../Context/HomeContext'
import Instructions from './Instructions';
import PickCountry from './PickCountry';
import './pickgoldenplayer.scss';
import PickPlayers from './PickPlayers';
const PickGoldenPlayer = ({setSkip}) => {
    const {user,isDark} = globalUser();
    const [fetchCountry,setFetchCountry] = useState(null);
  
  return (
    <div className={`goldenPlayer-container ${isDark?'dark':''}`}>

        <Instructions setSkip = {setSkip}/>
        <PickCountry setFetchCountry = {setFetchCountry}/>
         <PickPlayers setSkip= {setSkip} user={user} fetchCountry={fetchCountry} />

    </div>
  )
}

export default PickGoldenPlayer