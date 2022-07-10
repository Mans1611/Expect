import './playercard.scss'
const PlayerCard = ({player}) => {
    return ( 
        <div className="palyerCard">
            <div className="playerCardInfo">
                <div className="imgBackground"><img className='playerCardImg' src={player.img} alt="" /></div>
                <span className='playerCardName'>{player.name}</span>
            </div>
        </div>
     );
}
 
export default PlayerCard;