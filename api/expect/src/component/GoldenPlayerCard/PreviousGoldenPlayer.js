import React, {useRef, useState} from 'react'
import { globalUser } from '../../Context/HomeContext';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const PreviousGoldenPlayer = ({player}) => {
    const [showPlayerDetails,setShowMoreDetails] = useState(false);
    const {isDark} = globalUser();
    const details = useRef(null)
    const arrow = useRef(null)

    const  handleShowMoreDetails =  (e) =>{
        e.preventDefault();
        document.getElementsByClassName("background")[0].classList.toggle("expand");
        document.getElementsByClassName("arrow-playerdetails")[0].classList.toggle('rotate');
        setShowMoreDetails(state=>!state);
    }

  return (
    <div className='previousGoldenPlayer'>
        <div className="header">
            <h1>Previous Player</h1>
        </div>
        <div className="player">
            <div className="player-personal">
                <img src={player.playerImg} />
                <h3>{player.playerName}</h3>
            </div>
            <div className="player-personal">

                <img className='country' src={player.logo} />
                <h3>{player.countryName}</h3>
            </div>
            <div >
                <h2>{player.position}</h2>
            </div>
            <div className="detail">
                <h1 className='points'>{player.doublePoints}</h1>
                Points
            </div>
        </div>
        {
            
            <div ref={details} className='background'>
                <div className= {`playerMatchPoints-container ${isDark ? 'dark' : ''}`} >
                    <div className="table-header-wrapper row">
                        <div className="item">Opponent</div>
                        <div className="item">Stage</div>
                        <div className="item">PTS</div>
                    </div>

                    {
                        player.matchDetails.map((detail,index)=>(
                        <div key={index} className="detail-player row">
                            <div className="item flex-img">
                                <h3>{detail.opponent}</h3>
                                <img src={detail.logo}/>
                            </div>
                            <h4 className="item stage">{detail.stage.includes("Group") ? detail.stage.slice(12) : detail.stage  }</h4>
                            <h2 className="item">{detail.points}</h2>
                        </div>

                ))
            }
            </div>
            </div>
        }
        <div className="previousPlayerbutton-wrapper">
            <div onClick={handleShowMoreDetails} className='previousPlayerButton'>
                < KeyboardArrowUpIcon ref = {arrow} className = "arrow-playerdetails" />  
            </div>

        </div>
    </div>
  )
}

export default PreviousGoldenPlayer