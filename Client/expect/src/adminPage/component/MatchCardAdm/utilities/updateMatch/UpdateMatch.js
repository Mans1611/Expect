import React from 'react'
import './updateMatch.scss'
import CloseIcon from '@mui/icons-material/Close';
import PlayerCard from '../../../../../component/popmatchcard/playercard/PlayerCard';
import { useEffect,useRef } from 'react';
import axios from 'axios';
import { matchesStore } from '../../../../Context/matchesContext';
import PlayerCardRadio from '../../../../../component/PlayerCardRadio/PlayerCardRadio';
import { useState } from 'react';
const UpdateMatch = ({match,setUpdate})=> {
  const store = matchesStore();
  // this code down below is to cahnge the background color when you select a player

  // const playerNavigator = document.querySelector(`input:checked`)
  // useEffect(()=>{
  //   console.log(playerNavigator);
  //   return ()=>{
  //     if(playerNavigator == null)
  //       return 0
  //     if(playerNavigator.tagName === 'INPUT'){
  //       playerNavigator.nextSibling.firstChild.style.backgroundColor = '#ec0323';
  //       console.log( playerNavigator.nextSibling);
  //     }
  //   }
  // },playerNavigator)
  
  const hidePop = (e)=>{
    if(e.target.className === 'UpdateMatchContainer' || e.target.tagName == 'svg'){
      setUpdate(false);
    }
  
}
  const [country_1_result,setResult1] = useState(match.firstCountry.result);
  const [country_2_result,setResult2] = useState(match.secondCountry.result);


  const handleUpdate = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.put(`/matches/editmatch/${match.matchId}`,{
        result1 : country_1_result,
        result2 : country_2_result,
        fullTime : false
      })
      setUpdate(false);
      const {updatedMatch,msg} = response.data;
      
    }catch(err){
      console.log("check your internet");
    }
  }

  const fullTime = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.put(`/matches/editmatch/${match.matchId}`,{
        fullTime: true
      })
      setUpdate(false)
      }catch(err){
      console.log("error in full time");
    }
  }

  return (
    <div className='UpdateMatchContainer' onClick={hidePop}>
        <div className="updatePop">
          <CloseIcon onClick = {hidePop} className='closeIcon' />
          <div className="matchcardHeader">
                <div className="matchCardCountry"> {/* country1.*/ }
                    <img src={match.firstCountry.logo} alt="" className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.firstCountry.countryName}</span>
                    <span className="countryLabel">{match.firstCountry.result}</span>

                </div>
                VS
                <div className="matchCardCountry">
                    <img src={match.secondCountry.logo} alt="" className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.secondCountry.countryName}</span>
                    <span className="countryLabel">{match.secondCountry.result}</span>
                </div>

            </div>
            <div className="formContainer">
              <form>
                <div className="changeResult">
                    <input maxLength='1' onChange={(e)=>setResult1(e.target.value)} type="number" name="result" id="country_1_result" />
                    <input maxLength='1' onChange={(e)=>setResult2(e.target.value)} type="number" name="result" id="country_2_result" />
                
                </div>
                <div className="matchCardPlayers">
                    <span className="countryLabel">Select Player from {match.firstCountry.countryName}</span>
                    <div className="playersContainer">
                      {match.firstCountry.players.map((player)=> <PlayerCardRadio auth={true} countryOrder= 'firstCountry' player={player} />)}
                    </div>
                    <span className="countryLabel"> Select Player from {match.secondCountry.countryName}</span>
                    <div className="playersContainer">
                        {match.secondCountry.players.map((player)=>{
                            return (
                              <PlayerCardRadio auth={true} countryOrder= 'secondCountry' player={player} />
                            )
                        })}
                    </div>
                </div>
                <div className="buttonWrapper">
                  <button  onClick={handleUpdate}>Update </button>
                  <button  onClick={fullTime} className='fulltime'>Full Time</button>
                </div>
              </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateMatch;


