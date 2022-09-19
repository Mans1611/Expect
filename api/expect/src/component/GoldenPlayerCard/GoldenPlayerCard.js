import './goldenPlayercard.scss';
import React, { useState } from 'react'
import { globalUser } from '../../Context/HomeContext';
import PlayerCard from '../popmatchcard/playercard/PlayerCard';
import AddIcon from '@mui/icons-material/Add';
import PickGoldenPlayer from '../PickGoldenPlayer/PickGoldenPlayer';
import CloseIcon from '@mui/icons-material/Close';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import UpdateGoldenPlayer from './UpdateGoldenPlayer';
import PlayerEachMatchPoints from '../PlayerMatchPoints/PlayerEachMatchPoints';

const GoldenPlayerCard = ({goldenTotalPoints}) => {
    const {isDark,token, user,setUser} = globalUser();
    const [showPickGoldenPlayer,setShowPickGoldenPlayer] = useState(false);
    const [showUpdategolden,setShowUpdateGolden] = useState(false);
    const [showPlayerPoints,setShowPlayerPoints] = useState(false);
    
  

    const hidePop = (e)=>{
        if(e.target.className === 'popMatchFullPage'){
            setShowPickGoldenPlayer(false);
        }
    }

  return (
    <>
        <div className ={`informationWrapper goldenPlayercard ${isDark ? 'dark':''}`}>
            <div className={`information ${isDark? 'dark':null}`}>
                <div className="informationHeader-Wrapper">
                    <h2 className='InformationHeader'>Your Golden Player</h2>
                </div>
                <div>
                {
                    user.goldenPlayer.player?
                    
                        <div className="playerCard-container">
                            <PlayerCard player={user.goldenPlayer.player}/>
                            
                            {
                                user.goldenPlayer.updateCounter === 1 &&
                                <div className="buttons-wrapper">

                                    <button className='changeGoldenbutton' onClick={()=>setShowUpdateGolden(true)}>
                                        Change Player 
                                        <ChangeCircleIcon/>
                                    </button>
                                    {
                                        !showPlayerPoints &&
                                        <button onClick={()=>setShowPlayerPoints(true)} className='show-points'>Show Player Points</button>
                                    }
                                </div>  
                            }

                        </div>
                        : 
                        <div className="content">

                            <div onClick={()=> setShowPickGoldenPlayer(true)} className="addicon">
                                <AddIcon/>
                                <h2>
                                    Pick Your Golden Player
                                </h2>
                            </div>
                        </div>
                } 
                </div>
                {showPlayerPoints && <PlayerEachMatchPoints  player={user.goldenPlayer.player}/>}
                    <div className="goldenPlayerPoints-container">
                        <div className="points">
                            <h3>Points</h3>
                            <h1>{(goldenTotalPoints?goldenTotalPoints:0)/2}</h1>
                        </div>
                        <h1 className="factor">X2</h1>
                    </div>

                    <div className="totalgoldenPoints">Total Points : {goldenTotalPoints?goldenTotalPoints:0}</div>
            </div>
            
            {showPickGoldenPlayer && 
             <div  onClick={hidePop}  className="popMatchFullPage">
                <div className={`popMatchContainer ${isDark && 'dark'}`}>
                    <CloseIcon onClick={()=> setShowPickGoldenPlayer(false)} className='Popicon'/>
                    <PickGoldenPlayer 
                        profileSet = {true}
                        setUser = {setUser}
                        setSkip={setShowPickGoldenPlayer} />
                </div>
            </div>
            }
            {showUpdategolden && <UpdateGoldenPlayer 
                                    setUser={setUser} 
                                    profileSet = {true} 
                                    setShowUpdateGolden = {setShowUpdateGolden} />}
        </div>
        
    </>
  )
}

export default GoldenPlayerCard