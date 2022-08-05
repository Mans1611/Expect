import React , {useEffect,useState} from 'react'
import ExpectPhone from '../../component/Expectes/PhoneComponent/ExpectPhone';
import './standing.scss';

import io from 'socket.io-client';
import TopPlayers from '../../component/TopPlayers/TopPlayers';
import HomeStanding from '../../component/HomeStanding/HomeStanding';
import { globalUser } from '../../Context/HomeContext';
import TopVotes from '../../component/TopVotes/TopVotes';
import MatchCardPhone from '../../component/matchcards/MatchCardPhone/MatchCardPhone';

const socket = io.connect('http://localhost:8000');


const States = ()=> {
   
    const {isDark} = globalUser();
    
  return (
    <div className={`states ${isDark ? 'dark' : ''}`}>
        <div className="statesTitle">
          Statistics
        </div>
       
        <TopPlayers/>
        <TopVotes/>
        <HomeStanding/>
    </div>
  )
}

export default States;