

import React, { useContext, useEffect,useState } from 'react'
import { MatchCardContext } from '../../../component/matchcards/MatchCard';
import './matchResultComp.scss';
import Minute from './Minute';

import { MatchStateCentral } from '../../../Context/MatchCardContext';

const MatchResultComp =({matchId,result_1,result_2,FT/* which comes from DB */,time})=> {
  const [min,setMin] = useState(1);

  const matchStore = MatchStateCentral();

  return (
    <div className='matchResultComp'>
        <h1 className="result">{result_1}</h1>

        {/* so if the match is full time it endes */}

        {
            FT ? <div className="circle">{matchStore.state.state}</div> :  <Minute matchId = {matchId}  setMin = {setMin} min={min} matchTime={time} /> 
        }

        <h1 className="result">{result_2}</h1>
    </div>
  )
}

export default MatchResultComp