import { useState,useContext } from 'react';
import { userContext } from '../../../Context/HomeContext';
import './playercard.scss';
import { matchesStore } from '../../../adminPage/Context/matchesContext';

const PlayerCard = ({showPlayerState,player,countryOrder,auth}) => {

    const {isDark} = useContext(userContext);
    const [state,setState] = useState(null);
    return ( 
        <div className={`palyerCard ${isDark? 'dark':''}`}>
            <div className="playerCardInfo">
                <div className="imgBackground">
                    <img className='playerCardImg' src={player.players? player.players.playerImg: player.playerImg } alt="" />
                    {player.logo && <img src={player.logo} className="country-flag" />}
                    {player.country&&  <img src={player.country.logo} className="country-flag" />}
                    {player.country && <h6 className='details country'>{player.country.countryName}</h6>}
                </div>
                <div className="playerDetails">
                    <h6 className='details name'>{player.players?  player.players.playerName : player.playerName }</h6>
                    <h6 className='details'>PlayerPosition : {player.players? player.players.position : player.position}</h6>
                    <h6 className='details'>Total Points : { player.players? player.players.totalPoints : player.playerPoints ? player.playerPoints : player.totalPoints  }</h6>
                    
                    {player.country? null : <h6 className='details'>Total Votes : { player.players? player.players.totalVotes :  player.votes  }</h6>}
                    {player.nextMatch &&   <h6 className='details'>Next Match : { player.nextMatch}</h6>}
                    {auth && showPlayerState && <SelectionComp countryOrder={countryOrder}  setState={setState}  name={countryOrder}/> }
                </div>
            </div>
        </div>
     );
}
 
const SelectionComp = ({countryOrder})=>{
    return (
        <select className = 'PlayerStateSelction' id = {`${countryOrder}State`}>
            <option value={null} disabled>None</option>
            <option  className='goodPoints'>Score Long Goal (6PTS)</option>
            <option  className='goodPoints'> Score Goal From Free Kick (6PTS)</option>
            <option className='goodPoints'>Score Goal (5PTS)</option>
            <option className='goodPoints'>Make ASSIST (3PTS)</option>
            <option className='goodPoints'>Score Penalty (3PTS)</option>
            <option className='goodPoints'>Make Penalty(2PTS)</option>
            <option className='badPoints'>Conced Penalty (-2PTS)</option>
            <option className='badPoints'>Score Own Goal (-3PTS)</option>
            <option className='badPoints'>Take Red Card (-4PTS)</option>
        </select>
    )
}
export default PlayerCard;