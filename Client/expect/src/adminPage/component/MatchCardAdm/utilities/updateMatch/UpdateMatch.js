import React , {useState} from 'react'
import './updateMatch.scss'
import CloseIcon from '@mui/icons-material/Close';
import { matchesStore } from '../../../../Context/matchesContext';
import PlayerCardRadio from '../../../../../component/PlayerCardRadio/PlayerCardRadio';

import { PlayerStateToObject } from '../../../../../utilis/PlayerStateToObject';
import io from 'socket.io-client';



const socket = io.connect('http://localhost:8000'); // we connect it to the bakend server;

const UpdateMatch = ({match,setUpdate,min})=> {
  const store = matchesStore();
  const [date,setDate] = useState(null);
  const [updatePlayerState,setUpdatePlayerState] = useState(null);

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
    
    
    let editDate = document.getElementById('dateEdit').value;
    let editTime = document.getElementById('timeEdit').value;
    let updateMatchTime = null;

    // this code below is to just arrange the date and time to be used in Date();
    if(editDate && editTime){
        editDate = editDate.split('-');
        updateMatchTime = `${editDate[1]},${editDate[2]},${editDate[0]},${editTime}`;
    }
    let updatedPlayer_1 = null,updatedPlayer_2 = null;

    if(updatePlayerState){
      const selcted_player_1 = document.querySelector('input[name="firstCountry"]:checked').id;
      const selcted_player_2 = document.querySelector('input[name="secondCountry"]:checked').id;
      const state_1Player = document.getElementById('firstCountryState').value;
      const state_2Player = document.getElementById('secondCountryState').value;
      // here i senf the minute with the player to be able to show it in the state to the users
      updatedPlayer_1 = PlayerStateToObject(selcted_player_1,state_1Player,"first",min)
      // i set a prop which is country just to aside each country in the state component
      // for example first country will be to the righ and the second will be to the left
      updatedPlayer_2 =  PlayerStateToObject(selcted_player_2,state_2Player,"second",min)
    }
    

    try{
      socket.emit('updatingMatch',{
        result1 : country_1_result,
        result2 : country_2_result,
        updatedPlayer_1 ,
        updatedPlayer_2 ,
        matchId: match.matchId,
        fullTime : false,
        updateMatchTime
      })
      

      //   const response = await axios.put(`/matches/editmatch/${match.matchId}`,{
      //   result1 : country_1_result,
      //   result2 : country_2_result,
      //   updatedPlayer_1,
      //   updatedPlayer_2,
      //   fullTime : false
      // })
      setUpdate(false);
      // const {updatedMatch,msg} = response.data;
      
    }
    catch(err){
      console.log(err);
    }


  }

  const fullTime = async(e)=>{
    e.preventDefault();
    try{
        socket.emit("updatingMatch",{fullTime :true,matchId:match.matchId});
        setUpdate(false);
        
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
                    <input onChange={(e)=>setDate(e.target.value)} type="date"  id="dateEdit" />
                    <input onChange={(e)=>setTime(e.target.value)} type="time"  id="timeEdit" />
                  </div>

                  <div className="changeResult">
                    <input maxLength='1' onChange={(e)=>setResult1(e.target.value)} type="number" name="result" id="country_1_result" />
                    <input maxLength='1' onChange={(e)=>setResult2(e.target.value)} type="number" name="result" id="country_2_result" />
                  </div>
                  <div className="showPlayersbutton-wrapper">
                    <button className="showPlayerState" onClick={(e)=>{e.preventDefault();setUpdatePlayerState(!updatePlayerState)}}>
                      {
                        updatePlayerState ? "Hide Players" : "Show Players"
                      }
                    </button>
                  </div>
                
                {updatePlayerState &&
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
                      }

                <div className="buttonWrapper">
                  <button  onClick={handleUpdate}>Update</button>
                  <button  onClick={fullTime} className='fulltime'>Full Time</button>
                </div>
              </form>
            </div>
        </div>
    </div>
  )
}

export default UpdateMatch;


