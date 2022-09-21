import React, { useState } from 'react'
import { globalUser } from '../../Context/HomeContext'
import PlayerEachMatchPoints from '../PlayerMatchPoints/PlayerEachMatchPoints'
import PlayerCard from '../popmatchcard/playercard/PlayerCard'

const UserGoldenPlayer = ({goldenPlayer, userName}) => {
    const {isDark} = globalUser()
    const [showPlayerPoints,setShowPlayerPoints] = useState(false);
   
  return (
    <>
        <div className ={`informationWrapper goldenPlayercard ${isDark ? 'dark':''}`}>
            <div className={`information ${isDark? 'dark':''}`}>
                <div className="informationHeader-Wrapper">
                    <h2 className='InformationHeader'> {`${userName}'s`} Golden Player</h2>
                </div>
                <div>   
                <div className="playerCard-container">
                    {
                        goldenPlayer.player ? 
                            <PlayerCard player={goldenPlayer.player}/>
                            : 
                            <div className="noContent">No Golden Player is picked </div>

                    }
                </div>
                       
                
                </div>

                {showPlayerPoints && goldenPlayer.player && <PlayerEachMatchPoints  player={goldenPlayer.player}/>}
                    {/* <div className="goldenPlayerPoints-container">
                        <div className="points">
                            <h3>Points</h3>
                            <h1>{(goldenTotalPoints?goldenTotalPoints:0)/2}</h1>
                        </div>
                        <h1 className="factor">X2</h1>
                    </div> */}

                    {/* <div className="totalgoldenPoints">Total Points : {goldenTotalPoints?goldenTotalPoints:0}</div> */}
            </div>
            
            
           
        </div>
        
    </>
  )
}

export default UserGoldenPlayer