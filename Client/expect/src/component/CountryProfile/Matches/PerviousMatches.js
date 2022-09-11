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

        <div className="PerMatches-Contaier phoneContainer">
            {
              previousMatches.length === 0 ? 
              <div className="noContent">No Matches Played Yet</div>
              :
                previousMatches.map((match,index)=>{

                  return (
                    <>
                      <MathchCard  key={index} match = {match}/>
                      <MatchCardPhone key = {index} timeUp = {timeUp} setTimeUp = {setTimeUp} match={match}/>
                    </>
                  )
                })

              }
        </div>
    </div>
  )
}

export default PerviousMatches