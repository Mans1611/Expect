import { useState,useContext } from 'react';
import { userContext } from '../../../Context/HomeContext';
import './playercard.scss';
const PlayerCard = ({showPlayerState,player,auth}) => {
    const {isDark} = useContext(userContext);
    return ( 
        <div className={`palyerCard ${isDark? 'dark':''}`}>
            <div className="playerCardInfo">
                <div className="imgBackground"><img className='playerCardImg' src={player.playerImg} alt="" /></div>
                <div className="playerDetails">
                    <h6 className='details'>{player.playerName}</h6>
                    <h6 className='details'>PlayerPosition : {player.position}</h6>
                    <h6 className='details'>Totoal Points : {player.playerPoints}</h6>
                    {auth && <h6 className="details">Total Votes : {player.votes}  </h6>}
                    {auth && showPlayerState && <SelectionComp/> }
                    {auth && <button  className='adminButton'>Update Player</button>}
                
                </div>
           
            
            </div>
        </div>
     );
}
 
const SelectionComp = ()=>{
    return (
        <select className = 'PlayerStateSelction'>
            <option disabled>None</option>
            <option className='goodPoints'>Long Goal (6PTS)</option>
            <option className='goodPoints'>Goal Foul (6PTS)</option>
            <option className='goodPoints'>Goal (5PTS)</option>
            <option className='goodPoints'>ASSIST (3PTS)</option>
            <option className='goodPoints'>Penalty Goal (3PTS)</option>
            <option className='goodPoints'>Make Penalty(2PTS)</option>
            <option className='badPoints'>Conced Penalty (-2PTS)</option>
            <option className='badPoints'>Own Goal (-3PTS)</option>
            <option className='badPoints'>Red Card (-4PTS)</option>
        </select>
    )
}
export default PlayerCard;