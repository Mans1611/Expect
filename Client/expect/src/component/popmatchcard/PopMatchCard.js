import '../popupmatchcard.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState,useContext,useReducer } from 'react';
import axios from 'axios';

import BalanceIcon from '@mui/icons-material/Balance';
import { globalUser } from '../../Context/HomeContext';
import PlayerCardRadio from '../PlayerCardRadio/PlayerCardRadio';
import CreatingExpect from '../../utilis/CreatingExpectObject';
import SelectPlayerCard from './playercard/SelectPlayerCard';
import { ReducePlayerFn, statePlayers } from './ReducerPlayer';
import { CreatePlayerObject } from '../PlayerCardRadio/CreatePlayerObject';
import PlayerCard from './playercard/PlayerCard';

const PopMatchCard = ({match,setPop,type,userExpect}) => {
    document.body.style.overflow = 'hidden';
    const {isDark,userGlob} = globalUser();
    
    const [playersState,dispatchPlayer] = useReducer(ReducePlayerFn,statePlayers);

    useEffect(()=>{
        return async()=>{
            if(userExpect){
                document.getElementById('result_1').value = userExpect.result1_value;
                document.getElementById('result_2').value = userExpect.result2_value;
                document.getElementById(userExpect.winnerValue).checked = true;   
                document.getElementById(userExpect.mutatePlayer1.playerName).checked = true;  
                document.getElementById(userExpect.mutatePlayer2.playerName).checked = true; 
            }
        }
    },[])
    
    const handleSelect = (country,countryPlayers)=>{
       if (!document.querySelector(`input[name=${country}]:checked`))
            return null;
       
        let player = document.querySelector(`input[name=${country}]:checked`).id;
        player = CreatePlayerObject(countryPlayers,player);
        dispatchPlayer({type :`PlayerSelect${playersState.selected}` , payload : player});
    }
    console.log(playersState);

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
        const winnerValue = document.querySelector('input[name="countryWinner"]:checked').id;
        const result1_value = document.querySelector('input[id="result_1"]').value;
        const result2_value = document.querySelector('input[id="result_2"]').value;
        
        if((result1_value === result2_value && winnerValue !== 'draw') || (result1_value !== result2_value && winnerValue === 'draw') ){
            dispatch({type:"warnMsg", payload : "Your Expected Result Do Not Match With The Winner"})
            return 0 ;
        }
        if(
            (result1_value > result2_value && winnerValue !== match.firstCountry.countryName) ||   
            (result1_value < result2_value && winnerValue !== match.secondCountry.countryName)
          )
            // if statment implementation
            {
                dispatch({type : "warnMsg",payload : "Check The Result And the Winner State"});
                return 0;
            }

        let updateObject = CreatingExpect(match.firstCountry.players,match.secondCountry.players,userExpect.userPoints);
        try{
            const updatedResponse = await axios.put(`/expects/editexpect/${userGlob}`,{
            matchId : match.matchId,
            ...updateObject
            });
            dispatch({type:"success Update",payload: updatedResponse.data.msg});
            setTimeout(()=>{
                setPop(false)
            },1500);
        }catch(err){
        console.log(err);

        }
    }

        const handlePost = async (e)=>{
            e.preventDefault();
            const winnerValue = document.querySelector('input[name="countryWinner"]:checked').id;
            const result1_value = document.querySelector('input[id="result_1"]').value;
            const result2_value = document.querySelector('input[id="result_2"]').value;
            
            if((result1_value === result2_value && winnerValue !== 'draw') || (result1_value !== result2_value && winnerValue === 'draw') ){
                dispatch({type:"warnMsg",payload : "Check The Result And the Winner State"})
                return 0 ;
            }
            if(
                (result1_value > result2_value && winnerValue !== match.firstCountry.countryName) ||   
                (result1_value < result2_value && winnerValue !== match.secondCountry.countryName)
              )
                // if statment implementation
                {
                    dispatch({type : "warnMsg",payload : "Check The Result And the Winner State"});
                    return 0;
                }
                if(playersState.player1.playerName === playersState.player2.playerName || playersState.player3.playerName === playersState.player4.playerName){
                    dispatch({type : "warnMsg",payload : "Check the players selection again !!"});
                    return 0 ;
                }

            try{
                const expectObject = CreatingExpect(playersState);
                
                const response = await axios.post(`/expects/addexpect/${userGlob}`,{
                    matchId : match.matchId,
                    ...expectObject
                });
    
                if(response.status === 201){
                    dispatch({type:"success",payload:response.data.msg});
        
                    setTimeout(()=>{
                        setPop(false)
                },2000);

                }
    
            }catch(err){
                console.log(err);
            }
        
    
    }
    


    return (
        <div  onClick={hidePop}  className="popMatchFullPage">
            <div className={`popMatchContainer ${isDark? 'dark':''}`}>
                <CloseIcon onClick={()=> setPop(false)} className='Popicon'/>
                <form>
                <div className="headerPopUp">
                    <div className="popMatchWinner">
                        <span className="winnerTitle">Select Winner</span>    
                    </div>

                    <div className="matchcardHeader">

                        <label htmlFor={match.firstCountry.countryName}>
                            <div className="matchCardCountry">
                                <img src={match.firstCountry.logo} alt={match.firstCountry.countryName}   className="popMatchCardCountryImg" />
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
                            <input  defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_1" className="result" />
                            <input   defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_2" className="result" />
                            
                        </div>
                        <div className="matchCardPlayers">
                            <h2 className="countryLabel">Select Player from {match.firstCountry.countryName}</h2>
                            
                            <div className="choose-container">
                                    <div onClick={()=>{dispatchPlayer({type : `showFirstCountryPlayer1`})}}>
                                        {playersState.player1 ? 
                                            <PlayerCard player={playersState.player1}/> : 
                                            <SelectPlayerCard order = {1} playersState={playersState} dispatchPlayer={dispatchPlayer}/>}
                                    </div>
                                    <div onClick={()=>{dispatchPlayer({type : `showFirstCountryPlayer2`})}}>
                                        { playersState.player2 ? 
                                            <PlayerCard  player={playersState.player2}/> : 
                                            <SelectPlayerCard order = {2} playersState={playersState} dispatchPlayer={dispatchPlayer} countryOrder="FirstCountry"  playerOrder="Player2"/>}</div>
                                    </div>
                            
                            <div className="playersContainer"  onClick={()=>handleSelect("firstCountry",match.firstCountry.players)}>
                                {
                                    playersState.showPlayer1? 
                                    match.firstCountry.players.map((player,index)=>
                                        <PlayerCardRadio  countryOrder= 'firstCountry' player={player} key={index} />
                                        ) : null
                                }
                                {
                                    playersState.showPlayer2? 
                                    match.firstCountry.players.map((player,index)=>
                                        <PlayerCardRadio  countryOrder= 'firstCountry' player={player} key={index} />
                                        ) : null
                                }
                                
                            </div>
                            <h2 className="countryLabel"> Select Player from {match.secondCountry.countryName}</h2>
                                <div className="choose-container">
                                 <div onClick={()=>{dispatchPlayer({type : `showSecondCountryPlayer1`})}} >
                                    { playersState.player3 ? <PlayerCard player={playersState.player3}/> : <SelectPlayerCard order = {3} playersState={playersState} dispatchPlayer={dispatchPlayer} countryOrder="SecondCountry" playerOrder="Player1"/>}
                                </div>  
                                <div onClick={()=>{dispatchPlayer({type : `showSecondCountryPlayer2`})}}>
                                    { playersState.player4 ? <PlayerCard  player={playersState.player4}/> : <SelectPlayerCard order = {4} playersState={playersState} dispatchPlayer={dispatchPlayer} countryOrder="SecondCountry"  playerOrder="Player2"/>}
                                </div> 
                                </div>
                            <div className="playersContainer" onClick={()=>handleSelect("secondCountry",match.secondCountry.players)}>
                                    {
                                        playersState.showPlayer3 ? 
                                        match.secondCountry.players.map((player,index)=>{
                                            return(
                                                <PlayerCardRadio countryOrder= 'secondCountry' key={index} player = {player}/>
                                            )
                                        }) : null
                                        
                                    }
                                    {
                                        playersState.showPlayer4 ?
                                        match.secondCountry.players.map((player,index)=>{
                                            return <PlayerCardRadio countryOrder= 'secondCountry' key={index} player = {player}/>
                                        }) : null
                                        
                                    }
                            </div>
                        </div>
                        {Msg.showMsg && <div className={Msg.className}>{Msg.msg} </div>}
                        <div className="buttonsWrapper">
                            { type === "POST" ? 
                             <button onClick={handlePost} className='matchCardButton save' >Save</button>
                             :
                             <button onClick={handleUpdate} className='matchCardButton save' >Update</button>

                                
                            }
                        </div>



                </div>
                </form>

                
                
                
            </div>

        </div>
   
        
        
     );
}
 
export default PopMatchCard;