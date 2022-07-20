

import React, { useContext, useEffect,useState } from 'react'
import { MatchCardContext } from '../../../component/matchcards/MatchCard';
import './matchResultComp.scss';
import Minute from './Minute';

const MatchResultComp =({result_1,result_2})=> {


    // useEffect(()=>{
    //     setInterval(()=>{
    //         let temp = min + 2
    //         setMin(temp);
    //     },1000*5)
    // },[min])
    const {match} = useContext(MatchCardContext); 
    console.log(match.matchTime);
  return (
    <div className='matchResultComp'>
        <h1 className="result">{result_1}</h1>

        {/* so if the match is full time it endes */}
        {
            match.fullTime ? <div className="circle">FT</div> :  <Minute/> 
        }

        <h1 className="result">{result_2}</h1>
    </div>
  )
}

export default MatchResultComp