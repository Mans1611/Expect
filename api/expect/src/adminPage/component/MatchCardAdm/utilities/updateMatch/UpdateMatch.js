// style file
import './updateMatch.scss'

import React , {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { matchesStore } from '../../../../Context/matchesContext';
import PlayerCardRadio from '../../../../../component/PlayerCardRadio/PlayerCardRadio';

import { PlayerStateToObject } from '../../../../../utilis/PlayerStateToObject';
import io from 'socket.io-client';
import { MatchStateCentral } from '../../../../../Context/MatchCardContext';
import State from '../../../../../component/MatchState/State';
import NextMatchStep from './NextMatchStep';
import PlayerCardLinup from '../../../../../component/PlayerCardRadio/PlayerCardLinup';
import Axios from '../../../../../Axios/axios';


// https://expect-app.herokuapp.com/
// http://localhost:8000

// const socket = io.connect('https://expect-app.herokuapp.com/',{
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// }); // we connect it to the bakend server;


const socket = io.connect('http://localhost:8000',{
    withCredentials: true,
        extraHeaders: {
            "my-custom-header": "abcd"
  }
}); // we connect it to the bakend server;

const UpdateMatch = ({match,min})=> {
  

  // states of the component  
  const [updatePlayerState,setUpdatePlayerState] = useState(false);
  const [StoppingTime,setStoppingTime] = useState(match.stoppingTime);
  const [country_1_result,setResult1] = useState(match.firstCountry.result);
  const [country_2_result,setResult2] = useState(match.secondCountry.result);
  
  const [showLinup,setShowLinup] = useState(false);

  const [showMatchState,setShowMatchState] = useState(false);  

  // this code down below is to cahnge the background color when you select a player 

  

  const {state,dispatch} = MatchStateCentral();

  const hidePop = (e)=>{
    if(e.target.className === 'UpdateMatchContainer' || e.target.tagName == 'svg'){
        dispatch({type : "hideUpdate"});
    }
  
}



const handleUpdate = async(e)=>{
    e.preventDefault();
    let editDate = document.getElementById('dateEdit').value;
    let editTime = document.getElementById('timeEdit').value;
    let updateMatchTime = null;
    let matchStatus = document.getElementById('matchStatus').value;

    // this code below is to just arrange the date and time to be used in Date();
    if(editDate && editTime){
        editDate = editDate.split('-');
        updateMatchTime = `${editDate[1]},${editDate[2]},${editDate[0]},${editTime}`;
    }
    let updatedPlayer_1 = null , updatedPlayer_2 = null;

    if(updatePlayerState){
      const selcted_player_1 = document.querySelector('input[name="firstCountry"]:checked')?.id;
      const selcted_player_2 = document.querySelector('input[name="secondCountry"]:checked')?.id;
      const selcted_player_1_index = document.querySelector('input[name="firstCountry"]:checked')?.value;
      const selcted_player_2_index = document.querySelector('input[name="secondCountry"]:checked')?.value;
      const state_1Player = document.getElementById('firstCountryState')?.value;
      const state_2Player = document.getElementById('secondCountryState')?.value;
      
      // here i send the minute with the player to be able to show it in the state to the users
      if(selcted_player_1)
        updatedPlayer_1 = PlayerStateToObject(selcted_player_1,state_1Player,"first",min,selcted_player_1_index)
      // i set a prop which is country just to aside each country in the state component
      // for example first country will be to the righ and the second will be to the left
      
      if(selcted_player_2)
        updatedPlayer_2 =  PlayerStateToObject(selcted_player_2,state_2Player,"second",min,selcted_player_2_index)
      
    }
    try{
      socket.emit('updatingMatch',{
        result1 : country_1_result,
        result2 : country_2_result,
        updatedPlayer_1 ,
        updatedPlayer_2    ,
        matchId: match.matchId,
        fullTime : false,
        matchTime : updateMatchTime,
        matchStatus
      })
      dispatch({type : "hideUpdate" })
    }
    catch(err){
      console.log(err);
    } 
  }

  const confirmLinup = async(e)=>{
    e.preventDefault();
    let firstCountryLinup = [] , secondCountryLinup = [];

    const firstCountryPlayers = document.querySelectorAll('input[name="firstCountry"]:checked');
    const secondCountryPlayers = document.querySelectorAll('input[name="secondCountry"]:checked');
    
    for(let player of firstCountryPlayers)
      firstCountryLinup.push({playerName : player.id, index : player.value}) 

    for(let player of secondCountryPlayers)
      secondCountryLinup.push({playerName : player.id, index : player.value}) 
  
    
      try{

        const response = await Axios.put(`/matches/updatelinup/${match.matchId}`,{
          firstCountryLinup,
          secondCountryLinup
        });
        
        console.log(response.data);
      }catch(err){
        console.log(err);
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
                    <img src={match.secondCountry.logo} alt="" className="matchCardCountryImg second" />
                    <span className='countryLabel'>{match.secondCountry.countryName}</span>
                    <span className="countryLabel">{match.secondCountry.result}</span>
                </div>

            </div>
            <div className="formContainer">
              <div className="VotesContainer">
                <h3>Totoal Votes : {match.votes}</h3>
              </div>
              <form>
                  <div className="changeResult">
                    <input type="date"  id="dateEdit" />
                    <input type="time"  id="timeEdit" />
                  </div>

                  <div className="changeResult">
                    <input maxLength='1' onChange={(e)=>setResult1(e.target.value)} type="number" name="result" id="country_1_result" />
                    <input maxLength='1' onChange={(e)=>setResult2(e.target.value)} type="number" name="result" id="country_2_result" />
                  </div>

                  <div className="showPlayersbutton-wrapper">
                    {
                      match.matchStatue !== "UpComing" && 
                      <button onClick={(e)=>{e.preventDefault();setShowMatchState(true)}}>Show Match State</button>
                    }
                    {
                       match.matchStatue === "UpComing" && 
                      <button onClick={(e)=>{e.preventDefault();setShowLinup(true)}}>Pick Line-Ups</button>
                    }
                    <button  onClick={(e)=>{e.preventDefault();setUpdatePlayerState(!updatePlayerState)}}>
                      {
                        updatePlayerState ? "Hide Players" : "Show Players"
                      }
                    </button>
                  </div>



                {showMatchState && 
                  <div className="matchStateContainer">
                    <h1 className="matchStateTitle">Match Satate</h1>
                    <div className="matchState">
                        {match.states.map( (state,index) => <State matchId = {match.matchId} index={index} auth={true}  key={index} state = {state}/>)}
                        
                    </div>
              </div>
                }
                {updatePlayerState &&
                  <div className="matchCardPlayers">
                      <span className="countryLabel">Select Player from {match.firstCountry.countryName}</span>
                      <div className="playersContainer">
                        {match.firstCountry.players.map((player,index)=> <PlayerCardRadio key={index} index={index} auth={true} countryOrder= 'firstCountry' player={player} />)}

                      </div>
                      <span className="countryLabel"> Select Player from {match.secondCountry.countryName}</span>
                      <div className="playersContainer">
                          {match.secondCountry.players.map((player,index)=><PlayerCardRadio key={index} index={index} auth={true} countryOrder= 'secondCountry' player={player} />)}
                      </div>
                  </div>
                      }
                      {showLinup && 
                          <div className="matchCardPlayers">
                            <span className="countryLabel">Select {match.firstCountry.countryName} Line-up </span>
                            <div className="playersContainer">
                              {match.firstCountry.players.map((player,index)=> <PlayerCardLinup key={index} index={index} auth={true} countryOrder= 'firstCountry' player={player} />)}
      
                            </div>
                            <span className="countryLabel"> Select  {match.secondCountry.countryName} Player </span>
                            <div className="playersContainer">
                                {match.secondCountry.players.map((player,index)=><PlayerCardLinup key={index} index={index} auth={true} countryOrder= 'secondCountry' player={player} />)}
                            </div>
                      </div>
                      }
                      
                   <NextMatchStep/>
                <div className="buttonWrapper">

                  <button  onClick={confirmLinup}>Confirm Linup</button>
                  <button  onClick={handleUpdate}>Update</button>
                </div>

               
              </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateMatch;


