import React, { useEffect, useReducer, useState } from 'react'
import ReactDom from 'react-dom';
import { globalUser } from '../../Context/HomeContext'
import { ReducePlayerFn, statePlayers } from './ReducerPlayer';
import CloseIcon from '@mui/icons-material/Close';
import BalanceIcon from '@mui/icons-material/Balance';
import PlayerCard from './playercard/PlayerCard';

// this component is for show    the user expections not for update or post just to show his expections info.

const PopExpectCard = ({match,setPop,userExpect}) => {
    const {isDark} = globalUser();
    const [playersState,dispatchPlayer] = useReducer(ReducePlayerFn,statePlayers);
    document.body.style.overflow = "hidden";
    useEffect(()=>{
        let isSubscribed = true;

        const fetchData = async()=>{
            try{
                if(userExpect){
                    document.getElementById('result_1').value = userExpect.result1_value;
                    document.getElementById('result_2').value = userExpect.result2_value;
                    document.getElementById(userExpect.winnerValue).checked = true;
                    dispatchPlayer({type : `PlayerSelect1`,payload : userExpect.mutatePlayer1})
                    dispatchPlayer({type : `PlayerSelect2`,payload : userExpect.mutatePlayer2})
                    dispatchPlayer({type : `PlayerSelect3`,payload : userExpect.mutatePlayer3})
                    dispatchPlayer({type : `PlayerSelect4`,payload : userExpect.mutatePlayer4})
                }
            }
            catch(err){
                console.log(err);
            }
        }

        fetchData().catch(err=>console.log(err));
        
        return ()=>{
            isSubscribed = false;
            document.body.style.overflow = "visible";
        }
    },[])

  return ReactDom.createPortal(
    <>
        
            <div  className="popMatchFullPage">
            <div className={`popMatchContainer ${isDark? 'dark':''}`}>
                
                <CloseIcon onClick={()=> setPop(false)} className='Popicon'/>
                <form>
                <div className="headerPopUp">
                    <div className="popMatchWinner">
                        <span className="winnerTitle"> Winner</span>    
                    </div>

                    <div className="matchcardHeader">

                        <label htmlFor={match.firstCountry.countryName}>
                            <div className="matchCardCountry">
                                <img src={match.firstCountry.logo} alt={match.firstCountry.countryName} className="countryImgState" />
                                <span className='countryLabel'>{match.firstCountry.countryName}</span>
                                <input readOnly type="radio" name="countryWinner" id={match.firstCountry.countryName} />
                            </div>
                        </label>
                        
                        <label htmlFor="draw">
                            <div  className="matchCardCountry flex ">
                                <div className="icon"><BalanceIcon /></div>
                                <span className='countryLabel'>Draw</span>
                                <input readOnly defaultChecked type="radio" name="countryWinner" id="draw" />
                            </div>
                        </label>
                        <label htmlFor={match.secondCountry.countryName}>
                            <div className="matchCardCountry">
                                <img  src={match.secondCountry.logo} alt={match.secondCountry.countryName} className="countryImgState secondImg" />
                                <span className='countryLabel'>{match.secondCountry.countryName}</span>
                                <input readOnly type="radio" name="countryWinner" id={match.secondCountry.countryName} />
                            </div>
                        </label>
                    </div>
                </div>

                <div className="formContainerPopup">
                        <h2 className="expectResult">Your Expected Result</h2>
                        <div className="inputcontainer">
                            <input readOnly  defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_1" className="result" />
                            <input readOnly   defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_2" className="result" />
                            
                        </div>
                        <div className="matchCardPlayers">
                            <h2 className="countryLabel">Your Selected Players from {match.firstCountry.countryName}</h2>
                            
                            <div className="choose-container">
                                    <div>{playersState.player1 && <PlayerCard player={playersState.player1}/>}</div>
                                    <div >{playersState.player2 && <PlayerCard  player={playersState.player2}/>} </div>
                            </div>
                            <h2 className="countryLabel"> Your Selected Players from {match.secondCountry.countryName}</h2>
                                <div className="choose-container">
                                    <div>{playersState.player3 && <PlayerCard player={playersState.player3}/>}</div>
                                    <div >{playersState.player4 && <PlayerCard  player={playersState.player4}/> }</div> 
                                </div>   
                        </div>
                      </div>
                </form>
            </div>

        </div>
   
    </>
   
        
    
  ,document.getElementById('portal'))
}

export default PopExpectCard