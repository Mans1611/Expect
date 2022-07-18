import { useContext } from 'react';
import { userContext } from '../../../Context/HomeContext';
import './playercard.scss'
const PlayerCard = ({player}) => {
    const {isDark} = useContext(userContext)
    return ( 
        <div className={`palyerCard ${isDark? 'dark':''}`}>
            <div className="playerCardInfo">
                <div className="imgBackground"><img className='playerCardImg' src={player.playerImg} alt="" /></div>
                <div className="playerDetails">
                    <h6 className='details'>{player.playerName}</h6>
                    <h6 className='details'>PlayerPosition : {player.position}</h6>
                    <h6 className='details'>Totoal Points {player.totalPoints}</h6>
                </div>
           
            
            </div>
        </div>
     );
}
 
export default PlayerCard;