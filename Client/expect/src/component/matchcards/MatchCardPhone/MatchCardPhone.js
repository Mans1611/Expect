

import React, { useState } from 'react'
import TimeCounter from '../../../TimeCounter';
import { globalUser } from '../../../Context/HomeContext';
import Minute from '../../../adminPage/component/MatchCardComponent/Minute';
import { MatchCardProvider } from '../../../Context/MatchCardContext';
import MatchState from '../../MatchState/MatchState';
import PopMatchCard from '../../popmatchcard/PopMatchCard';
import PopExpectCard from '../../popmatchcard/PopExpectCard';
import { useNavigate } from 'react-router-dom';

const MatchCardPhone = ({match,timeUp,setTimeUp,userExpect}) => {
    document.body.style.overflow = 'visible';
    
    const [pop,setPop] = useState(false);
    const [statePop,setStatePop] = useState(false);
    const [min,setMin] = useState(0)
    const [popShowExpect,setpopShowExpect] = useState(false);
    const navigate = useNavigate();
    const {auth} = globalUser(); 
    
    const checkAuth = ()=>{
        if(auth)
            return setPop(true);
        navigate('/register/signin')
    }

  return (
    <MatchCardProvider match={match} childeren={
        <div className='expectPhone'>
    <div className="upperExpectWrapper">
        <div className="countryWrapper">
            
            <img className='countryFlages' src={match.firstCountry.logo} alt={match.firstCountry.logo} />
            <div className={`dimond firstDimond ${ !timeUp && 'transparent'}`}>
                <div className='dimondContent'>
                    {timeUp && match.firstCountry.result}
                </div>
            </div>
        </div>
        <div className="middle">

            {timeUp ? match.fullTime ? "FT" : <Minute halfsTime={match.time} min = {min}  setMin = {setMin} matchTime={match.matchTime}/> 
            : 
            <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime}/> }

        </div>
        <div className="countryWrapper">
            <div className={`dimond secondDimond ${!timeUp && 'transparent'}`}>
                <div className='dimondContent'>
                    {timeUp && match.secondCountry.result}
                </div>
            </div>
            <img className='countryFlages' src={match.secondCountry.logo} alt={match.secondCountry.logo} />
        </div>
    </div>
    <div className="countryNameWrapper">
        <span className="countryName firstCountry">{match.firstCountry.countryName}</span>
            {match.expected ? <div className="checkExpected">Expected</div> :  <span className='vs'>VS</span>}
        <span className="countryName secondCountry">{match.secondCountry.countryName}</span>
    </div>

    <div className="ExpectPhoneWrap">
       {timeUp ?   <>
            <button onClick={()=>setStatePop(true)}>Match State</button> 
            {match.expected && <button onClick={()=>setpopShowExpect(true)}> My Expect </button>}
            </>
            :
            match.expected ? <button onClick={()=>setpopShowExpect(true)}> My Expect </button> :
            <button onClick={checkAuth}>Expect</button>
            
        
        } 
        
       {/* { match.expected && } */}
        
    </div>
    { statePop && timeUp && <MatchState expected = {false}  setPop = {setStatePop} match={match}/>}   
    {!timeUp && pop && <PopMatchCard type="POST" pop={pop} setPop={setPop}  match={match}/>}
    {popShowExpect && <PopExpectCard match={match} userExpect = {userExpect} setPop={setpopShowExpect} /> }
</div>
    }/>
    
  )
}

export default MatchCardPhone