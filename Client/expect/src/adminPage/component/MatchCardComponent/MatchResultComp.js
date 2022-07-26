

import React, { useContext, useEffect,useState } from 'react'
import { MatchCardContext } from '../../../component/matchcards/MatchCard';
import './matchResultComp.scss';
import Minute from './Minute';

const MatchResultComp =({result_1,result_2,FT,time})=> {
  const [min,setMin] = useState(1);
    
  return (
    <div className='matchResultComp'>
        <h1 className="result">{result_1}</h1>

        {/* so if the match is full time it endes */}

        {
            FT ? <div className="circle">FT</div> :  <Minute setMin = {setMin} min={min} matchTime={time} /> 
        }

        <h1 className="result">{result_2}</h1>
    </div>
  )
}

export default MatchResultComp