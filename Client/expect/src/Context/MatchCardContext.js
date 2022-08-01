import { useReducer,useContext,createContext } from "react";
import axios from 'axios';

const MatchContext  = createContext(null);




export const MatchCardProvider =  ({childeren,match})=>{
    let nextState = null;
    let showStopingTime = false;
    let currentState = match.matchStatue
    
    if(match.matchStatue === "GoingOn")
        nextState = "Pause";
    
    else if ( match.matchStatue === "HT" || match.matchStatue === "ET" ){
        currentState = "Paused"
        nextState = "Resume";
        showStopingTime = true;
    }

    else if ( match.matchStatue === "UpComing")
        nextState = "GoingOn";

    const initialState = {
        currentState,
        nextState,
        showUpdate : false,
        showStopingTime ,
        stoppingTime : match.stoppingTime 
    }

    const reduceFn =  (state,action)=>{
        switch(action.type){
            case "Started":
                return {currentState: "GoingOn",nextState : "Pause" , ...state}; 
            case 'PAUSE-MATCH':
                return {currentState : "Paused",nextState : "Resume",showUpdate : true,showStopingTime:true};   
            case 'RESUME-MATCH' :
                return {currentState : "GoingOn",nextState : "Pause", showUpdate : false, stoppingTime : action.payload};
            case 'FT' : 
                return { currentState : "FT" ,showUpdate : false};


            case "ShowUpdate" :
                return { ...state,showUpdate : true};
            case "hideUpdate" :
                return { ...state,showUpdate : false};

        }
    }

    const [state,dispatch] =   useReducer( reduceFn,initialState);

    return(
        <MatchContext.Provider value={{match,state,dispatch}}>
            {childeren}
        </MatchContext.Provider>
    )

}

export const MatchStateCentral = ()=> useContext(MatchContext);