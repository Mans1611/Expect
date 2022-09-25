import React from 'react'
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Axios from '../../Axios/axios';
import { globalUser } from '../../Context/HomeContext';

const  State = ({state,auth,userExpect,index,matchId})=> {

    const {user,goldenPlayer}  = globalUser();
   

    let expected = false;
    let secondExpect = false;
    let goldenPlayerSelect = false;
    
    const handleDeleteState = async(index)=>{
        try{
            const response = await Axios.put(`/matches/updatestate/${matchId}/${index}`);
            
        }catch(err){
            console.log(err);
        }
        
    }
    
    if(state.country === "first"){
        if(goldenPlayer)
            goldenPlayerSelect = state.playerName === goldenPlayer.player?.playerName;  // it is out in case of the user did not expect this game his golen player will be highlighted too.
        if(userExpect){
            expected = (state.playerName === userExpect.mutatePlayer1.playerName) && (userExpect.mutatePlayer1.subs? (parseInt(state.min)>=46) : true )
            secondExpect = (state.playerName === userExpect.mutatePlayer2.playerName) && (userExpect.mutatePlayer2.subs? (parseInt(state.min)>=46) : true )
            
            
        }
    

        return (

            <div className="stateContainer">
                <div className={`state first ${expected ? 'expected':''} ${secondExpect ? 'secondExpect':''} ${goldenPlayerSelect? 'goldenPlayer' : ''} `}>
                    {auth && <CloseIcon onClick = {(e)=>{e.preventDefault(); handleDeleteState(index)}} className='close'/>}
                    <div className="icon-wrapper">
                        <img src={state.icon} className="icon" />
                    </div>
                   <p>{state.playerName} {state.state}</p>
                   {expected && <span className="factor">X1.5</span> }
                   {secondExpect &&  <span className="factor">X1</span> }
                   {goldenPlayerSelect && <span className="factor">X2</span>}
                </div>
                <div className="circleWrapper">
                    <div className="circle">{state.min}</div>     
                </div>
                <div className='state empltyState'></div>
            </div>
            
            )
        }
        
        else if(state.country === "second"){
            if(goldenPlayer)
                goldenPlayerSelect = state.playerName === goldenPlayer.player?.playerName; 
            
            if(userExpect){
                expected = state.playerName === userExpect.mutatePlayer3.playerName && (userExpect.mutatePlayer3.subs? (parseInt(state.min)>=46) : true )
                secondExpect = state.playerName === userExpect.mutatePlayer4.playerName && (userExpect.mutatePlayer4.subs? (parseInt(state.min)>=46) : true )
                
            }
            
            return (
                <div className="stateContainer">
                    <div className={`state empltyState`}></div>
                    <div className="circleWrapper">
                    <div className="circle">{state.min}</div>     
                </div>
                    <div className={`state second ${expected ? 'expected':''} ${secondExpect ? 'secondExpect':''} ${goldenPlayerSelect? 'goldenPlayer' : ''}`}>
                        {expected && <span className="factor">X1.5</span> }
                        {secondExpect &&  <span className="factor">X1</span> }
                        {goldenPlayerSelect &&  <span className="factor">X2</span> }
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