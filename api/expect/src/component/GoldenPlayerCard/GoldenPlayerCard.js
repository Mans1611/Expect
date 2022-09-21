import './goldenPlayercard.scss';
import React, { useEffect, useState } from 'react'
import { globalUser } from '../../Context/HomeContext';
import PlayerCard from '../popmatchcard/playercard/PlayerCard';
import AddIcon from '@mui/icons-material/Add';
import PickGoldenPlayer from '../PickGoldenPlayer/PickGoldenPlayer';
import CloseIcon from '@mui/icons-material/Close';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import UpdateGoldenPlayer from './UpdateGoldenPlayer';
import PlayerEachMatchPoints from '../PlayerMatchPoints/PlayerEachMatchPoints';
import PreviousGoldenPlayer from './PreviousGoldenPlayer';
import Axios from '../../Axios/axios';
import SmallLaoding from '../loading/small.loading/smallLoading';

const GoldenPlayerCard = ({setGoldenPlayerPoints}) => {
    const {isDark,token,userGlob, user,setUser} = globalUser();
    const [showPickGoldenPlayer,setShowPickGoldenPlayer] = useState(false);
    const [showUpdategolden,setShowUpdateGolden] = useState(false);
    const [showPlayerPoints,setShowPlayerPoints] = useState(false);
    const [goldenPlayer,setGoldenPlayer] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        let subscribe = true;
        
        const fetchGoldenPlayerPoints = async ()=>{
            try{
                const {data} = await Axios.get(`/expects/calculategoldenPlayer/${userGlob}`,{
                    headers : {
                        token
                    }
                });
             
                if(subscribe){
                    setGoldenPlayer(data.goldenPlayer)
                    setGoldenPlayerPoints(data.goldenPlayer.totalPoints)
                }
                setLoading(false);

            }catch(err){
                console.log(err);
            }
        }
        fetchGoldenPlayerPoints();
        ()=> subscribe = false;
    },[])
  

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
                    loading ?
                        <SmallLaoding/>
                        :
                    goldenPlayer.player?
                    
                        <div className="playerCard-container">
                            <PlayerCard player={goldenPlayer.player}/>
                            
                            {
                                 goldenPlayer.old_Player 
                                 &&
                                 <PreviousGoldenPlayer player={goldenPlayer.old_Player}/>  

                            }
                            {
                                goldenPlayer.updateCounter === 1 &&
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
                {showPlayerPoints && <PlayerEachMatchPoints  player={goldenPlayer.player}/>}
                

                    {
                     goldenPlayer.player &&
                        <>
                            {/* <div className="goldenPlayerPoints-container">
                                <div className="points">
                                    <h3>Points</h3>
                                    <h1>{(goldenTotalPoints?goldenTotalPoints:0)/2}</h1>
                                </div>
                                <h1 className="factor">X2</h1>
                            </div> */}
                            <div className="totalgoldenPoints">Total Points :{ loading ? ' ...' : goldenPlayer.totalPoints}</div>
                        </>
                    }
                
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