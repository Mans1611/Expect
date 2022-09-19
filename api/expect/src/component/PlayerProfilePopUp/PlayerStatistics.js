import React from 'react'
import Detail from './Detail';

const PlayerStatistics = ({player}) => {
    const GOAL = "https://cdn-icons-png.flaticon.com/512/2726/2726007.png";
    const ASSIST = "https://cdn0.iconfinder.com/data/icons/football-soccer-vivid-vol-1-2/256/Assist-512.png";
    const SCORE_PENALTY = "https://cdn-icons-png.flaticon.com/512/2716/2716196.png";
    const RED_CARD = "https://cdn-icons-png.flaticon.com/512/451/451718.png";
    const YELLOW_CARD = "https://cdn-icons-png.flaticon.com/512/7153/7153240.png";
    const MAN_OF_THE_MATCH = "https://cdn-icons-png.flaticon.com/512/419/419952.png";
    const PENALTY_SAVE = "https://cdn-icons-png.flaticon.com/512/5043/5043516.png" ;
    const SaveChance = "https://cdn-icons-png.flaticon.com/512/1467/1467717.png"
  return (
    <div className='statistics-container'>
        <div className="goals-flex flex">
          {
            player.position === "GK" ? 
            <>
              <Detail img={PENALTY_SAVE} detailTitle = "Saved Penalty" detail={player.penaltySaved}/>
              <Detail img={SaveChance} detailTitle = "Saved Chances" detail={player.chanceSaved}/>
            </>
            :
            <>
              <Detail img={GOAL} detailTitle = "Goals" detail={player.goals}/>
              <Detail img={ASSIST} detailTitle = "Assist" detail={player.assist}/>
            </>
            
          }
           <Detail img={MAN_OF_THE_MATCH} detailTitle = "Man Of The Match" detail={player.manOfTheMatch}/>
        </div>
        <div className=" flex">
           <Detail img={YELLOW_CARD} detailTitle = "Yellow Cards" detail={player.yellowCard}/>
           <Detail img={RED_CARD} detailTitle = "Red Cards" detail={player.redCard}/>
           <Detail img={MAN_OF_THE_MATCH} detailTitle = "Man Of The Match" detail={player.manOfTheMatch}/>
        </div>
    </div>
  )
}

export default PlayerStatistics