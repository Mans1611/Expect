import React from 'react'

const  State = ({state})=> {
    console.log(state);
    if(state.country === "first")
        return (
            <div className="stateContainer">
                <div className={`state first`}>
                    <img src={state.icon} className="icon" />
                    {state.playerName} {state.state} 
                </div>
                <div className="circle">{state.min}</div> 
                <div className='state empltyState'></div>
            </div>
        )

        else if(state.country === "second")
            return (
                <div className="stateContainer">
                    <div className={`state empltyState`}></div>
                    <div className="circle">{state.min}</div> 
                    <div className='state second'>{state.playerName} {state.state}
                        <img src={state.icon} className="icon" />
                    </div>
                </div>
            )
   

    }

export default State