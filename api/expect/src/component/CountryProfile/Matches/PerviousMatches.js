import React,{useState} from 'react'
import MathchCard from '../../matchcards/MatchCard';
import MatchCardPhone from '../../matchcards/MatchCardPhone/MatchCardPhone';
import './perviousMatches.scss';

const PerviousMatches = ({previousMatches}) => {
    const [timeUp,setTimeUp] = useState(false);

  return (
    <div className='PerviousMatches'>
        <div className="header">
            <h1>Previous Matches</h1>
        </div>
      <>
            {
              previousMatches.length === 0 ? 
              <div className="noContent">No Matches Played Yet</div>
              :
                previousMatches.map((match,index)=>{
                  return (
                    <div className="PerMatches-Contaier phoneContainer">
                      <MathchCard  key={index} match = {match}/>
                      <MatchCardPhone key = {index+100} timeUp = {timeUp} setTimeUp = {setTimeUp} match={match}/>
                    </div>
                  )
                })
                
              }
      </>
    </div>
  )
}

export default PerviousMatches