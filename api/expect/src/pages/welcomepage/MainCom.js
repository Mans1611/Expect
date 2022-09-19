import React, { useState,useEffect } from 'react'
import {Link, Outlet} from 'react-router-dom';
import PlayerExpects from './Expects.component/PlayerExpects';
import ResultExect from './Expects.component/ResultExect';
import WinnerExpect from './Expects.component/WinnerExpect';
import PlayerPointsPop from './Expects.component/PlayerPointsPop';
import MatchesContainer from '../../component/MatchesContainer/MatchesContainer';
import Groups from '../../component/Groups/Groups';
import NewsContainer from '../../component/NewsContainer/NewsContainer';
import GoldenPlayerSection from '../../component/GoldenPlayerSection/GoldenPlayerSection';
import TeamSection from '../../component/TeamSection/TeamSection';


const MainCom = () => {
  document.body.style.overflow = "visible";

  const [popup,setPop] = useState(false);
  
  useEffect(()=>{
    let cards_container = document.getElementsByClassName('cards-container')[0];

    let observer = new IntersectionObserver((entries)=>{    
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                document.getElementsByClassName('winnerExpect')[0].classList.add('origin');
                document.getElementsByClassName('resultExpect')[0].classList.add('origin');
                document.getElementsByClassName('playersExpect')[0].classList.add('origin');
            }
        })
    },{
        threshold:0.5
    });
    if(cards_container)
        observer.observe(cards_container)
},[])

  return (
      <div className="WelcomePageCover">
        <h1 className="firstTitle">GET POINTS FROM <span>World Cup </span> Matches</h1>
        <h2 className="firstTitle"> <span> Expect </span> &  Take Part in <span>World Cup </span></h2>
        <div className="buttonsWrapper">
                <Link to='/register/signup' className="WelcomeNavbarButtons blueButton">Create Account</Link>
                <Link to='/register/signin' className="WelcomeNavbarButtons">Sign In</Link>
            </div>
            <div className="cards-container">
              <WinnerExpect index = {0}/>
              <ResultExect index = {1}/>
              <PlayerExpects index = {2} setPop={setPop}/>
            </div>
            <GoldenPlayerSection/>
            <TeamSection/>
            <div className="groupsandMatches">
              <MatchesContainer/>
              <Groups/>
            </div>
            <NewsContainer dark={true} countryName={"worldcup"}/>
            {popup && <PlayerPointsPop setPop={setPop}/>}
          
              
      </div>
  )
}

export default MainCom