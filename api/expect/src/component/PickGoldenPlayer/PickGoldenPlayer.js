import React ,{useEffect, useState} from 'react'
import { globalUser } from '../../Context/HomeContext'
import Instructions from './Instructions';
import PickCountry from './PickCountry';
import './pickgoldenplayer.scss';
import PickPlayers from './PickPlayers';
import ReactDom from 'react-dom';

const PickGoldenPlayer = ({setSkip,profileSet,setUser}) => {
    const {user,isDark} = globalUser();
    const [fetchCountry,setFetchCountry] = useState(null);
  
  return (
    <div className={`goldenPlayer-container ${isDark?'dark':''}`}>

        <Instructions setSkip = {setSkip}/>
        <PickCountry setFetchCountry = {setFetchCountry}/>
        <PickPlayers 
            profileSet = {profileSet} 
            setUser={setUser} 
          setSkip= {setSkip} 
            user={user} 
            fetchCountry={fetchCountry} />

    </div>
  )
}

export default PickGoldenPlayer