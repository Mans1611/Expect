import React, { useState } from 'react'
import PlayerExpects from './Expects.component/PlayerExpects';
import ResultExect from './Expects.component/ResultExect';
import WinnerExpect from './Expects.component/WinnerExpect';
import PlayerPointsPop from './Expects.component/PlayerPointsPop';
const MainCom = () => {
  const [popup,setPop] = useState(false);
  return (
    <div className="WelcomePageCover">
                <h1 className="firstTitle">GET POINTS FROM <span>
                World Cup </span> Matches</h1>
                <div className="cards-container">
                    <WinnerExpect/>
                    <ResultExect/>
                    <PlayerExpects setPop={setPop}/>
                </div>
                {popup && <PlayerPointsPop/>}
            </div>
  )
}

export default MainCom