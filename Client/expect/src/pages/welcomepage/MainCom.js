import React, { useState } from 'react'
import PlayerExpects from './Expects.component/PlayerExpects';
import ResultExect from './Expects.component/ResultExect';
import WinnerExpect from './Expects.component/WinnerExpect';
import PlayerPointsPop from './Expects.component/PlayerPointsPop';
import MatchesContainer from '../../component/MatchesContainer/MatchesContainer';
const MainCom = () => {
  document.getElementsByTagName("body")[0].style.overflow = "visible";

  const [popup,setPop] = useState(false);
  const visited = localStorage.getItem('visited');
  
  return (
      <div className="WelcomePageCover">
                <h1 className="firstTitle">GET POINTS FROM <span>World Cup </span> Matches</h1>
                { visited ? 
                    <>
                      <MatchesContainer/>
                      <h1>Instructions</h1>
                      <div className="cards-container">
                        <WinnerExpect/>
                        <ResultExect/>
                        <PlayerExpects setPop={setPop}/>
                      </div>
                      {popup && <PlayerPointsPop setPop={setPop}/>}
                    </> 
                :
                    <>
                      <div className="cards-container">
                        <WinnerExpect/>
                        <ResultExect/>
                        <PlayerExpects setPop={setPop}/>
                      </div>
                      <MatchesContainer/>
                      {popup && <PlayerPointsPop setPop={setPop}/>}
                    </> 
                
                  
                }
            </div>
  )
}

export default MainCom