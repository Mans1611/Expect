import React, { useState } from 'react'
import { globalUser } from '../../Context/HomeContext'
import PickCountry from '../PickGoldenPlayer/PickCountry';
import PickPlayers from '../PickGoldenPlayer/PickPlayers';
import CloseIcon from '@mui/icons-material/Close';


const UpdateGoldenPlayer = ({setUser,profileSet,setShowUpdateGolden}) => {
    const {isDark,user} = globalUser();
    const [fetchCountry,setFetchCountry] = useState(null);
    const [skip,setSkip] = useState(false);

  return (
    <div  className="popMatchFullPage updateGoldenPop">
                <div className={`popMatchContainer ${isDark? 'dark':''}`}>
                    <CloseIcon onClick={()=> setShowUpdateGolden(false)} className='Popicon'/>
                    <div className={`goldenPlayer-container ${isDark?'dark':''}`}>
                        <PickCountry profileSet={profileSet} setFetchCountry = {setFetchCountry}/>
                        <PickPlayers
                            profileSet = {profileSet} 
                            setUser={setUser} 
                            setSkip= {setSkip} 
                            user={user} 
                            fetchCountry={fetchCountry}
                            updateGoldenPlayer = {true}
                        />
                    </div>
                
                </div>

        </div>
  )
}

export default UpdateGoldenPlayer;