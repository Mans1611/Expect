import React from 'react'
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Axios from '../../Axios/axios';

const  State = ({state,auth,userExpect,index,matchId})=> {
    let expected = false;
    let secondExpect = false;
    
    const handleDeleteState = async(index)=>{
        try{
            const response = await Axios.put(`/matches/updatestate/${matchId}/${index}`);
            console.log(response);
        }catch(err){
            console.log(err);
        }
        
    }
    
    if(state.country === "first"){

        if(userExpect){
            expected = state.playerName === userExpect.mutatePlayer1.playerName  ? true : false;
            secondExpect = state.playerName === userExpect.mutatePlayer2.playerName  ? true : false;
        }
    

        return (

            <div className="stateContainer">
                <div className={`state first ${expected ? 'expected':null} ${secondExpect ? 'secondExpect':''} `}>
                    {auth && <CloseIcon onClick = {(e)=>{e.preventDefault(); handleDeleteState(index)}} className='close'/>}
                    <div className="icon-wrapper">
                        <img src={state.icon} className="icon" />
                    </div>
                   <p>{state.playerName} {state.state}</p>
                </div>
                <div className="circleWrapper">
                    <div className="circle">{state.min}</div>     
                </div>
                <div className='state empltyState'></div>
            </div>
            
            )
        }
        
        else if(state.country === "second"){
            if(userExpect){
                expected = state.playerName === userExpect.mutatePlayer3.playerName  ? true : false;
                secondExpect = state.playerName === userExpect.mutatePlayer4.playerName
            }
            
            return (
                <div className="stateContainer">
                    <div className={`state empltyState`}></div>
                    <div className="circleWrapper">
                    <div className="circle">{state.min}</div>     
                </div>
                    <div className={`state second ${expected ? 'expected':''} ${secondExpect ? 'secondExpect':''}`}>
                        <p>{state.playerName} {state.state}</p>
                        <div className="icon-wrapper">
                            <img src={state.icon} className="icon" />
                        </div>
                    {auth && <CloseIcon onClick = {(e)=>{e.preventDefault(); handleDeleteState(index)}} className='close '/>}
                    </div>
                </div>
            )
        }
        else if(state.country === "both"){

            return (
                <>
                    <div className="middleState-wrapper">
                        <div className='middleState'>{state.playerName} {state.state}
                            <img src={state.icon} className="icon" />
                        </div>
                    </div>
                    
                </>
            )
        }

    }

export default State