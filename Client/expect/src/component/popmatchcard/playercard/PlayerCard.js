import './playercard.scss'
const PlayerCard = ({player}) => {
    return ( 
        <div className="palyerCard">
            <div className="playerCardInfo">
                <div className="imgBackground"><img className='playerCardImg' src={player.playerImg} alt="" /></div>
                <span className='playerCardName'>{player.playerName}</span>
            </div>
        </div>
     );
}
 
export default PlayerCard;