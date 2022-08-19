import React,{useReducer} from 'react'
import './popup.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
const PlayerPointsPop = () => {
    // const [index,setIndex] = useState(0);
    const rules = [
        {img:"https://i.pinimg.com/originals/09/a6/e2/09a6e2dc9d294cf89a05b22b91639a34.jpg",text : "If Your Player Scores Gaol From Free-Kick",points : 6},
        {img:"https://www.thesun.co.uk/wp-content/uploads/2018/07/NINTCHDBPICT000415154293.jpg",text : "If Your Player Scores Gaol Outside The Box ",points : 5},

]
    const [Reules,setRules] = useState(rules);
    
    const reduceFn = (state,action)=>{
        
        if(action.type === "increment" && state.index === rules.length - 1 )
            return {index : 0};
        else if(action.type === "decrement" && state.index === 0)
            return {index : rules.length - 1};
        else if(action.type === "increment")
            return {index : state.index+1};
        else if(action.type === "decrement" )
            return {index : state.index - 1};
        else {
            return {index : 0}
        }
            
    }

    const [state,dispatch] = useReducer(reduceFn,{index : 0});

   
  return (
    <div class='popup'>
            <ArrowBackIosIcon onClick={()=>dispatch({type:"decrement"})} className='arrow'/>
        <div className="slideShow-Container">
            <div className="slide">
                <div className="imagewrapper">
                    <img src={Reules[state.index].img} alt=""  />
                </div>
                <div className="textWrapper">
                    <div className="details">
                        {Reules[state.index].text}
                    </div>
                    <div className="total-Points">
                        <h1>Total Points</h1>
                        <span className="point">{Reules[state.index].points}</span>
                    </div>
                </div>
            </div>
        </div>
        <ArrowForwardIosIcon onClick={()=>dispatch({type:"increment"})} className='arrow'/>
    </div>
  )
}

export default PlayerPointsPop