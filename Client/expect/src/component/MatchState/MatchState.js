import React, { useContext } from 'react'
import { globalUser } from '../../Context/HomeContext'
import './matchState.scss'
import State from './State';
import CloseIcon from '@mui/icons-material/Close';
import { MatchStateCentral } from '../../Context/MatchCardContext';

const MatchState = ({match,setPop,userExpect,expected}) => {
    
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    
    const {isDark} = globalUser();
    const hidePop = (e)=>{
        if(e.target.className === 'popMatchFullPage'){
            setPop(false);
        }
    }
   
    
  return (
    <div onClick={hidePop} className='popMatchFullPage'>
        <div className={`popMatchContainer ${isDark? 'dark':''}`}>
            <CloseIcon onClick = {()=>setPop(false)} className='CloseIcon'/>
            <div className="matchcardHeader">
                <div className="matchCardCountry"> {/* country1.*/ }
                    <img src={match.firstCountry.logo} alt="" className="countryImgState" />
                    <span className='countryLabel'>{match.firstCountry.countryName}</span>
                    <span className='countryLabel'>{match.firstCountry.result}</span>
                </div>
                    <h1>VS</h1>
                <div className="matchCardCountry">
                    <img src={match.secondCountry.logo} alt="" className="countryImgState" />
                    <span className='countryLabel'>{match.secondCountry.countryName}</span>
                    <span className='countryLabel'>{match.secondCountry.result}</span>
                    
                </div>
                </div>
                <div className="matchStateContainer">
                    <h1 className="matchStateTitle">Match Satate</h1>
                    <div className="matchState">
                        {
                            match.states.map( (state,index) => <State userExpect={userExpect} key={index} state = {state} /> )
                        }
                        {
                            expected && match.fullTime && 
                            <div className="points-container">
                                <div className="points winnerPoints">
                                    <h1 className="head">Winner Points</h1>
                                    <h2 className="point">{userExpect.WinnerPoints}</h2>
                                </div>

                                <div className="points resultPoints">
                                    <h1 className="head">Result Points</h1>
                                    <h2 className="point">{userExpect.result_Points}</h2>
                                </div>

                                <div className="points totalPoints">
                                    <h1 className="head">Total Points</h1>
                                    <h2 className="point">{userExpect.userPoints}</h2>
                                </div>
                        </div>
                        }
                    </div>
                </div>
        </div>
    </div>
  )
}

export default MatchState