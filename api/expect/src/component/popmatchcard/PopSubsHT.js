import '../popupmatchcard.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState,useContext,useReducer } from 'react';
import axios from 'axios';
import Axios from '../../Axios/axios';
import BalanceIcon from '@mui/icons-material/Balance';
import { globalUser } from '../../Context/HomeContext';
import PlayerCardRadio from '../PlayerCardRadio/PlayerCardRadio';
import CreatingExpect from '../../utilis/CreatingExpectObject';
import SelectPlayerCard from './playercard/SelectPlayerCard';
import { ReducePlayerFn, statePlayers } from './ReducerPlayer';
import { CreatePlayerObject } from '../PlayerCardRadio/CreatePlayerObject';
import PlayerCard from './playercard/PlayerCard';
import PickGoldenPlayer from '../PickGoldenPlayer/PickGoldenPlayer';
import ReactDom from 'react-dom'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';


const PopSubsHT = ({match,setPop,type,userExpect}) => {

    document.body.style.overflow = 'hidden';
    const {isDark,userGlob,token,user,setExpected} = globalUser();
    
    const [playersState,dispatchPlayer] = useReducer(ReducePlayerFn,statePlayers);


    useEffect(()=>{
        return async()=>{
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
    },[])
    
    const handleSubsReducer = (country,countryPlayers,subOut)=>{
       if (!document.querySelector(`input[name=${country}]:checked`))
            return null;
       
        let player = document.querySelector(`input[name=${country}]:checked`).id;
        player = CreatePlayerObject(countryPlayers,player);
        
        dispatchPlayer({type : `SubsPlayer${playersState.selected}` , payload : {
            subIn : player ,
            subOut
        }});
    
    }
    

    const hidePop = (e)=>{
        if(e.target.className === 'popMatchFullPage'){
            setPop(false);

        }
    }
    
    
    const reducerFN = (state, action)=>{
        switch(action.type){
            case 'warnMsg' : 
                return { msg : action.payload ,className : "warnMsg",showMsg:true};
            
            case 'success':
                return {msg : action.payload ,showMsg:true,className : 'succsess' };
            case "success Update":
                return {msg : action.payload, showMsg : true, className : "succsess"};
            default : 
            throw new Error('error in reducer')    
            }  
        }

    const [Msg,dispatch] = useReducer(reducerFN,{msg : '',className:'',showMsg : false} )
    
    const handleUpdate = async (e)=>{
        e.preventDefault();

        let updateObject = CreatingExpect(playersState,true);
        try{
            const updatedResponse = await axios.put(`/expects/substitute/${userGlob}`,{
            matchId : match.matchId,
            ...updateObject
            },{
                headers : {
                    token,
                    userGlob
                }
            });

            dispatch({type:"success Update",payload: updatedResponse.data.msg});
            setExpected(updatedResponse.data.expects);
            setTimeout(()=>{
                setPop(false)
            },1300);
        }catch(err){
        console.log(err);

        }
    }
    const handleDropDown = (e)=>{
        e.preventDefault();
       
        let target = document.getElementById('no-edit-input');
        target.style.height = "fit-content";
        target.style.overflow = "visible";
        document.getElementsByClassName('showExpect')[0].style.display = "none"

    }
       
    


    return ReactDom.createPortal(
        <div  onClick={hidePop}  className="popMatchFullPage">
            <div className={`popMatchContainer ${isDark && 'dark'}`}>
                <CloseIcon onClick={()=> setPop(false)} className='Popicon'/>
                    
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
                                            <input disabled = {true} type="radio" name="countryWinner" id={match.firstCountry.countryName} />
                                        </div>
                                    </label>
                                    
                                    <label htmlFor="draw">
                                        <div  className="matchCardCountry flex ">
                                            <div className="icon"><BalanceIcon /></div>
                                            <span className='countryLabel'>Draw</span>
                                            <input disabled = {true} defaultChecked type="radio" name="countryWinner" id="draw" />
                                        </div>
                                    </label>
                                    <label htmlFor={match.secondCountry.countryName}>
                                        <div className="matchCardCountry">
                                            <img  src={match.secondCountry.logo} alt={match.secondCountry.countryName} className="countryImgState secondImg" />
                                            <span className='countryLabel'>{match.secondCountry.countryName}</span>
                                            <input disabled = {true} type="radio" name="countryWinner" id={match.secondCountry.countryName} />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="formContainerPopup">
                                    <h2 className="expectResult"> Your Expected Result</h2>
                                    <div className="inputcontainer">
                                        <input disabled = {true}  defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_1" className="result" />
                                        <input disabled = {true}  defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_2" className="result" />
                                        
                                    </div>
                            
                        

                  {/* <div onClick={handleDropDown} className="showExpect">
                    Show My Expect
                    <ArrowDropDownCircleIcon/>
                  </div> */}


                
                        <div className="substituteHeader">
                            <h2>You Can Only Substitute just <span> One </span>Player </h2>
                        </div>
                        <div className="matchCardPlayers">
                            <h2 className="countryLabel">Your Selected Players from {match.firstCountry.countryName}</h2>
                            
                            <div className="choose-container">
                                    <div>
                                    
                                        {playersState.player1 &&
                                            <div className="playersubsContainer">
                                                <PlayerCard  player={playersState.player1}/> 
                                                {
                                                    playersState.subsOff ?                      
                                                    <button className = "disableButton" disabled={true} onClick={(e)=>{e.preventDefault();dispatchPlayer({type : `showFirstCountryPlayer1`})}}>Substitute <ChangeCircleIcon/> </button>
                                                    :
                                                    <button onClick={(e)=>{e.preventDefault();dispatchPlayer({type : `showFirstCountryPlayer1`})}}>Substitute <ChangeCircleIcon/> </button>
                                                }
                                            </div>
                                            }
                                    </div>

                                    <div >
                                        { playersState.player2 
                                                &&
                                            <div className="playersubsContainer">
                                                <PlayerCard  player={playersState.player2}/>
                                                {
                                                    playersState.subsOff ?                             
                                                   <button className = "disableButton" disabled={true} onClick={(e)=>{e.preventDefault();dispatchPlayer({type : `showFirstCountryPlayer2`})}}>Substitute <ChangeCircleIcon/> </button>
                                                    :
                                                    <button onClick={(e)=>{e.preventDefault();dispatchPlayer({type : `showFirstCountryPlayer2`})}}>Substitute <ChangeCircleIcon/> </button>
                                                }
                                            </div>
                                        }    
                                    </div>
                                    </div>
                            
                            
                                {
                                    playersState.showPlayer1&&
                                <div className="playersContainer"  onClick={()=>handleSubsReducer("firstCountry",match.firstCountry.players,playersState.player1)}>
                                    { match.firstCountry.players.map((player,index)=>
                                            <PlayerCardRadio  
                                            countryOrder= 'firstCountry' 
                                            player={player}
                                            position = {playersState.player2_position} 
                                            key={index} />
                                            ) 
                                        }
                                </div>
                                }
                                {
                                    playersState.showPlayer2 && 
                                    <div className="playersContainer"  onClick={()=>handleSubsReducer("firstCountry",match.firstCountry.players,playersState.player2)}>
                                        {match.firstCountry.players.map((player,index)=>
                                            <PlayerCardRadio  
                                            countryOrder= 'firstCountry'
                                            player={player}
                                            position = {playersState.player1_position}
                                            key={index} />
                                            )}
                                    </div> 
                                }
                                
                            <h2 className="countryLabel">Your Selected Players from  {match.secondCountry.countryName}</h2>
                                <div className="choose-container">
                                    <div>
                                        { 
                                            playersState.player3 
                                            &&
                                            <div className="playersubsContainer">
                                                <PlayerCard  player={playersState.player3}/> 
                                                {
                                                     playersState.subsOff ?
                                                     <button className = "disableButton" disabled={true} onClick={(e)=>{e.preventDefault();dispatchPlayer({type : `showSecondCountryPlayer1`})}}>Substitute <ChangeCircleIcon/></button>
                                                    :
                                                    <button onClick={(e)=>{e.preventDefault();dispatchPlayer({type : `showSecondCountryPlayer1`})}}>Substitute <ChangeCircleIcon/></button>
                                                }
                                            </div>                               
                                        }
                                    </div>  
                                    <div>
                                        { playersState.player4 
                                        &&
                                        <div className="playersubsContainer">
                                            <PlayerCard  player={playersState.player4}/> 
                                            {
                                                playersState.subsOff ?
                                                <button className = "disableButton" disabled={true} onClick={(e)=>{e.preventDefault();dispatchPlayer({type : `showSecondCountryPlayer2`})}}>Substitute <ChangeCircleIcon/></button>
                                                :
                                                <button onClick={(e)=>{e.preventDefault();dispatchPlayer({type : `showSecondCountryPlayer2`})}}>Substitute <ChangeCircleIcon/></button>
                                            }
                                        </div>
                                        
                                    }
                                    
                                    </div> 
                                </div>
                                    {
                                        playersState.showPlayer3 &&
                                        <div className="playersContainer" onClick={()=>handleSubsReducer("secondCountry",match.secondCountry.players,playersState.player3)}>

                                            {match.secondCountry.players.map((player,index)=>  
                                            <PlayerCardRadio 
                                            countryOrder= 'secondCountry' 
                                            key={index}
                                            position = {playersState.player4_position} 
                                            player = {player}/>
                                        
                                        )}
                                        </div>
                                        
                                    }
                                    {
                                        playersState.showPlayer4 &&
                                        <div className="playersContainer" onClick={()=>handleSubsReducer("secondCountry",match.secondCountry.players,playersState.player4)}>
                                            {match.secondCountry.players.map((player,index)=>  
                                            <PlayerCardRadio 
                                            countryOrder= 'secondCountry' 
                                            key={index} 
                                            position = {playersState.player3_position}
                                            player = {player}/>) }
                                        </div>
                                        
                                    }
                            
                        </div>


                        </div>
                        {Msg.showMsg && 
                        <div className="msg-wrapper">
                            <div className={Msg.className}>{Msg.msg} </div>
                        </div>
                        }
                    <div className="buttonsWrapper">
                    {
                        playersState.subsOff ?
                        <button  onClick={handleUpdate} className='matchCardButton save'>Save</button>
                        :
                        <button  disabled = {true}  className=' disabledButton'>Save</button>
                        
                    }
                    </div>
                    

                           



                </form>

                </div>
            </div>    
                
                
                
                
            

      
   
        
        
     ,document.getElementById('portal'));
}
 
export default PopSubsHT;