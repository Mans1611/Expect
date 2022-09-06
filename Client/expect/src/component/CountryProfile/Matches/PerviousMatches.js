import React,{useState} from 'react'
import MathchCard from '../../matchcards/MatchCard';
import './perviousMatches.scss';

const PerviousMatches = ({previousMatches}) => {
    
  return (
    <div className='PerviousMatches'>
        <div className="header">
            <h1>Previous Matches</h1>
        </div>
        <div className="PerMatches-Contaier">
            {
                previousMatches.map((match,index)=><MathchCard  key={index} match = {match}/>)
            }
        </div>
    </div>
  )
}

export default PerviousMatches