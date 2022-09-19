import './playerprofile.scss';
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { globalUser } from '../../Context/HomeContext';
import PlayerStatistics from './PlayerStatistics';
import Axios from '../../Axios/axios';
import SmallLaoding from '../loading/small.loading/smallLoading';
import PlayerEachMatchPoints from '../PlayerMatchPoints/PlayerEachMatchPoints';
import ReactDom from 'react-dom'
const PlayerProfilePop = ({player,setPop}) => {

    const {isDark} = globalUser();
    const [showPlayerDetails,setShowPlayerDetails] = useState(false);
    // const [Player,setPlayer] = useState({});
    // const [isLoading, setLoading] = useState(false);
    const hidePop = (e)=>{

       console.log(e.target.tagName);
        if(e.target.tagName === "svg" || e.target.tagName === "path")
            return setPop(false)

        if(e.target.className.includes('playerProfile')){
            setPop(false);
        }
    }

    let Player = null;
    if(player.players){
        Player = {
            countryName:player.countryName,
            logo : player.logo,
            ...player.players
        }
    }else{
        Player = {...player}
    }

    

    // useEffect(()=>{
    //     let isSubscribe = true;
    //     const fetchPlayer = async()=>{
    //         try{
    //             const {data} = await Axios.get(`/player/${player.countryName}/${player.players.playerName}`);
    //             if(isSubscribe)
    //                 setPlayer(data);
    //             setLoading(false);
    //         }catch(err){
    //             console.log(err);
    //         }
    //     }

    //     fetchPlayer();
    // },[])

  return ReactDom.createPortal(
    <div  onClick={hidePop}  className="popMatchFullPage playerProfile">
        <div className={`popMatchContainer ${isDark && 'dark'}`}>
            <CloseIcon onClick={()=> setPop(false)} className='Popicon'/>
            
                    <div className="player-header">
                        <div className="playerImg">
                            <img src={Player.playerImg} alt={Player.playerName} />
                        </div>
                        <div className="player-personl-details">
                            <h1 className="playerName">{Player.playerName}</h1>
                            <h2>{Player.position}</h2>
                        </div>
                        <div className="player-country">
                            <img src={Player.logo} />
                            <h2>{Player.countryName}</h2>
                        </div>
                    </div>
                    <div className="player-content-body">
                        <h1>Player Details</h1>
                        <PlayerStatistics player={Player}/>
                    </div>

                        {!showPlayerDetails 
                            && 
                            <div className="button-wrapper">
                                <button onClick={(e)=>{e.preventDefault(); setShowPlayerDetails(true)}}>Player Matches Points </button>
                            </div>
                            }
                    {showPlayerDetails &&
                    <div className='fakeackground'>
                        <PlayerEachMatchPoints player = {Player}/>
                    </div>
                    }
              
        </div>
    </div>
  ,document.getElementById('portal'))
}

export default PlayerProfilePop