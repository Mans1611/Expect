import React, { useState } from 'react'
import {Link, Outlet} from 'react-router-dom';
import PlayerExpects from './Expects.component/PlayerExpects';
import ResultExect from './Expects.component/ResultExect';
import WinnerExpect from './Expects.component/WinnerExpect';
import PlayerPointsPop from './Expects.component/PlayerPointsPop';
import MatchesContainer from '../../component/MatchesContainer/MatchesContainer';
import Groups from '../../component/Groups/Groups';
const MainCom = () => {
  document.body.style.overflow = "visible";

  const [popup,setPop] = useState(false);
  
  return (
      <div className="WelcomePageCover">
        <h1 className="firstTitle">GET POINTS FROM <span>World Cup </span> Matches</h1>
        <h2 className="firstTitle"> <span> Expect </span> &  Take Part in <span>World Cup </span></h2>
        <div className="buttonsWrapper">
                <Link to='/register/signup' className="WelcomeNavbarButtons blueButton">Create Account</Link>
                <Link to='/register/signin' className="WelcomeNavbarButtons">Sign In</Link>
            </div>
            <div className="cards-container">
              <WinnerExpect/>
              <ResultExect/>
              <PlayerExpects setPop={setPop}/>
            </div>
            <div className="groupsandMatches">
              <MatchesContainer/>
              <Groups/>
            </div>
            {popup && <PlayerPointsPop setPop={setPop}/>}
          
              
      </div>
  )
}

export default MainCom