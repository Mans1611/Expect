import React from 'react'
import SmallLaoding from '../../loading/small.loading/smallLoading';
import PlayerCard from '../../popmatchcard/playercard/PlayerCard';

const PlayerCardGridContainer = ({Players,isLoading}) => {
  return (
    <div className="playersContainer">
            {isLoading ? <SmallLaoding/> : 
                Players.length === 0 ? <div className="noContent">No Player Were Add</div> : 
                Players.map((player,index)=> <PlayerCard key={index} player={player}/>)
        }
    </div>
  )
}

export default PlayerCardGridContainer