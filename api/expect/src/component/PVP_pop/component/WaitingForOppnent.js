import React, { useEffect } from 'react';
import BalanceIcon from '@mui/icons-material/Balance';
import CloseIcon from '@mui/icons-material/Close';
import io from 'socket.io-client';
import Preperation from './Preperation';




const WaitingForOppnent = ({match, set_PVP_Pop,invitation}) => {

  return (
    <>
    <div className="vsContainer">
     
    </div>
    <CloseIcon onClick={()=> set_PVP_Pop(false)} className='Popicon'/>
                <form>
                <div className="headerPopUp">
                    <div className="popMatchWinner">
                        <span className="winnerTitle">Select Winner</span>    
                    </div>

                    <div className="matchcardHeader">

                        <label htmlFor={match.firstCountry.countryName}>
                            <div className="matchCardCountry">
                                <img src={match.firstCountry.logo} alt={match.firstCountry.countryName}   className="countryImgState" />
                                <span className='countryLabel'>{match.firstCountry.countryName}</span>
                                <input type="radio" name="countryWinner" id={match.firstCountry.countryName} />
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
                                <img  src={match.secondCountry.logo} alt={match.secondCountry.countryName} className="countryImgState secondImg" />
                                <span className='countryLabel'>{match.secondCountry.countryName}</span>
                                <input type="radio" name="countryWinner" id={match.secondCountry.countryName} />
                            </div>
                        </label>
                    </div>
                </div>
                
                <div className="formContainerPopup">
                        <h2 className="expectResult">Expect Result</h2>
                        <div className="inputcontainer">
                            <input  defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_1" className="result" />
                            <input   defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_2" className="result" />
                        </div>

                       <Preperation invitation={invitation} />
                </div>
        </form>
    </>

  )
}

export default WaitingForOppnent