import React from 'react'
import { useEffect } from 'react';

const  State = ({state,userExpect})=> {
    let expected = false;
    
    
    
    if(state.country === "first"){

        if(userExpect)
            expected = (state.playerName === userExpect.mutatePlayer1.playerName) ? true : false;
        return (

            <div className="stateContainer">
                <div className={`state first ${expected ? 'expected':''}`}>
                    <img src={state.icon} className="icon" />
                    {state.playerName} {state.state} 
                </div>
                <div className="circle">{state.min}</div> 
                <div className='state empltyState'></div>
            </div>
            
            )
        }

        else if(state.country === "second"){
            if(userExpect)
                expected = (state.playerName === userExpect.mutatePlayer2.playerName) ? true : false;

            return (
                <div className="stateContainer">
                    <div className={`state empltyState`}></div>
                    <div className="circle">{state.min}</div> 
                    <div className={`state second ${expected ? 'expected':''}`}>{state.playerName} {state.state}
                        <img src={state.icon} className="icon" />
                    </div>
                </div>
            )
        }
        else if(state.country === "both"){

            return (
                <div className="stateContainer">
                    <div className='middleState'>{state.playerName} {state.state}
                        <img src={state.icon} className="icon" />
                    </div>
                </div>
            )
        }

    }

export default State