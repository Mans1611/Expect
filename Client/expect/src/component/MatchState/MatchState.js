import React, { useContext } from 'react'
import { globalUser } from '../../Context/HomeContext'
import './matchState.scss'
import State from './State';
import CloseIcon from '@mui/icons-material/Close';

const MatchState = ({match,setPop}) => {
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
                    VS
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
                            match.states.map( (state,index) => <State key={index} state = {state} /> )
                        }
                        
                    </div>
                </div>
        </div>
    </div>
  )
}

export default MatchState