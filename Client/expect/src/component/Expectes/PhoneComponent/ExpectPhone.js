import React, {useState} from 'react'
import Minute from '../../../adminPage/component/MatchCardComponent/Minute';
import { globalUser } from '../../../Context/HomeContext';
import './phoneExpect.scss';
import TimeCounter from '../../../TimeCounter';
import PopMatchCard from '../../popmatchcard/PopMatchCard';
import '../../popupmatchcard.scss';
import MatchState from '../../MatchState/MatchState';

const ExpectPhone = ({match,userExpect})=> {
    document.getElementsByTagName("body")[0].style.overflow = 'visible'; 

    const {isDark} = globalUser();
    const [timeUp, setTimeUp] = useState(false);
    const [pop,setPop] = useState(false);
    const [statePop,setStatePop] = useState(false);
    const [min,setMin] = useState(0)
   

 

    return (
    <div className='expectPhone'>
        <div className="upperExpectWrapper">
            <div className="countryWrapper">
                <img className='countryFlages' src={match.firstCountry.logo} alt="" />
                <div className="dimond firstDimond">
                    <div className='dimondContent'>
                        {timeUp && match.firstCountry.result}
                    </div>
                </div>
            </div>
            <div className="middle">

                {timeUp ? match.fullTime ? "FT" : <Minute min = {min}  setMin = {setMin} matchTime={match.matchTime}/> : <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime}/> }

            </div>
            <div className="countryWrapper">
                <div className="dimond secondDimond">
                    <div className='dimondContent'>
                        {timeUp && match.secondCountry.result}
                    </div>
                </div>
                <img className='countryFlages' src={match.secondCountry.logo} alt="" />
            </div>
        </div>
        <div className="ExpectPhoneWrap">
           {timeUp ?   <button onClick={()=>setStatePop(true)}> See My Expect </button> : 
                        <button onClick={()=>setPop(true)}> Edit Expect </button>
            }
        </div>
        {pop && <PopMatchCard userExpect={userExpect} match={match}  setPop = {setPop} />}
        { statePop && timeUp && <MatchState expected = {true} userExpect={userExpect}  setPop = {setStatePop} match={match}/>} 
          
    </div>
  )
}

export default ExpectPhone