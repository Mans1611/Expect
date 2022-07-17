import React from 'react'
import './updateMatch.scss'
import CloseIcon from '@mui/icons-material/Close';
import PlayerCard from '../../../../../component/popmatchcard/playercard/PlayerCard';
import { useEffect,useRef } from 'react';
import axios from 'axios';
import { matchesStore } from '../../../../Context/matchesContext';
import PlayerCardRadio from '../../../../../component/PlayerCardRadio/PlayerCardRadio';
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
    if(e.target.className === 'UpdateMatchContainer' || e.target.tagName == 'path'){
      setUpdate(false);
    }
  
}
  const country_1_result = useRef(0);
  const country_2_result = useRef(0);


  const handleUpdate = async(e)=>{
    e.preventDefault();
    console.log(country_1_result.current.value);
    console.log(country_2_result.current.value);
    try{
      const response = await axios.put(`/matches/editmatch/${match.matchId}`,{
        result1 : country_1_result.current.value,
        result2 : country_2_result.current.value
      })
      setUpdate(false);
      const {updatedMatch,msg} = response.data;
      console.log(msg); 

    }catch(err){
      console.log("check your internet");
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
              <form onSubmit={handleUpdate}>
                <div className="changeResult">
                    <input ref={country_1_result} type="number" name="result" id="country_1_result" />
                    <input ref={country_2_result} type="number" name="result" id="country_2_result" />
                </div>
                <div className="matchCardPlayers">
                    <span className="countryLabel">Select Player from {match.firstCountry.countryName}</span>
                    <div className="playersContainer">
                      {match.firstCountry.players.map((player)=> <PlayerCardRadio countryOrder= 'firstCountry' player={player} />)}
                    </div>
                    <span className="countryLabel"> Select Player from {match.secondCountry.countryName}</span>
                    <div className="playersContainer">
                        {match.secondCountry.players.map((player)=>{
                            return (
                              <PlayerCardRadio countryOrder= 'secondCountry' player={player} />
                            )
                        })}
                    </div>
                </div>
                <div className="buttonWrapper">
                  <button  type="submit">Update </button>
                </div>
              </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateMatch;


