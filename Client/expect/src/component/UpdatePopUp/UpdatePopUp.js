import './UpdatePopUp.scss';
import '../popupmatchcard.scss';
import PlayerCardRadio from '../PlayerCardRadio/PlayerCardRadio';
import BalanceIcon from '@mui/icons-material/Balance';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react'

const UpdatePopUp = ({match,togglePop}) => {
  return (
    <div className='UpdatePopUpContainer'>
        <div className="UpdatePopUp">
        <form>
                <div className="headerPopUp">
                    <CloseIcon onClick={togglePop} className='Popicon'/>
                    <div className="popMatchWinner">
                        <span className="winnerTitle">Select Winner</span>    
                    </div>

                    <div className="matchcardHeader">

                        <label htmlFor={match.firstCountry.countryName}>
                            <div className="matchCardCountry">
                                <img src={match.firstCountry.logo} alt={match.firstCountry.countryName}   className="popMatchCardCountryImg" />
                                <span className='countryLabel'>{match.firstCountry.countryName}</span>
                                <input  type="radio" name="countryWinner" id={match.firstCountry.countryName} />
                            </div>
                        </label>
                        
                        <label htmlFor="draw">
                            <div  className="matchCardCountry flex ">
                                <div className="icon"><BalanceIcon /></div>
                                <span className='countryLabel'>Draw</span>
                                <input defaultChecked type="radio" name="countryWinner" id="draw" />
                            </div>
                        </label>
                        <label htmlFor={match.secondCountry.countryName}>
                            <div className="matchCardCountry">
                                <img  src={match.secondCountry.logo} alt={match.secondCountry.countryName} className="popMatchCardCountryImg" />
                                <span className='countryLabel'>{match.secondCountry.countryName}</span>
                                <input type="radio" name="countryWinner" id={match.secondCountry.countryName} />
                            </div>
                        </label>
                    </div>
                </div>

                <div className="formContainerPopup">
                        <h2 className="expectResult">Expect Result</h2>
                        <div className="inputcontainer">
                            <input defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_1" className="result" />
                            <input defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_2" className="result" />
                            
                        </div>
                        <div className="matchCardPlayers">
                            <h2 className="countryLabel">Select Player from {match.firstCountry.countryName}</h2>
                            <div className="playersContainer">
                            {match.firstCountry.players.map((player,index)=>
                                <PlayerCardRadio  countryOrder= 'firstCountry' player={player} key={index} />
                                )}
                            </div>
                            <h2 className="countryLabel"> Select Player from {match.secondCountry.countryName}</h2>
                            <div className="playersContainer">
                                {match.secondCountry.players.map((player,index)=>{
                                    return <PlayerCardRadio countryOrder= 'secondCountry' key={index} player = {player}/>
                                })}
                            </div>
                        </div>

                        <div className="buttonsWrapper">
                            <button  className='matchCardButton save' >Save</button>
                        </div>

                </div>
                </form>

        </div>
    </div>
  )
}

export default UpdatePopUp