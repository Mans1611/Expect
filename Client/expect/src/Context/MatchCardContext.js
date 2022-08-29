import { useReducer,useContext,createContext,useEffect } from "react";
import Axios from "../Axios/axios";

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

    else if ( match.matchStatue === "UpComing"){
        nextState = "GoingOn";
        
    }

    const initialState = {
        currentState,
        nextState,
        showUpdate : false,
        showStopingTime,
        GoingOn : true
    }
    const reduceFn =  (state,action)=>{
        switch(action.type){
           
            case "Pause" : 
                return {...state , currentState : action.payload}; // where the payload is the HT ET 
            case "Started":
                return {...state,currentState: "GoingOn",nextState : "Pause" }; 
            case 'PAUSE-MATCH':
                return {currentState : "Paused",nextState : "Resume",showUpdate : true,showStopingTime:true};   
            case 'RESUME-MATCH' :
           
            case 'RESUME-MATCH' :
                return {currentState : "GoingOn",nextState : "Pause", showUpdate : false};
            case 'FT' : 
                return { currentState : "FT" ,showUpdate : false};

            case "ShowUpdate" :
                return { ...state,showUpdate : true};
            case "hideUpdate" :
                return { ...state,showUpdate : false};

        }
    }

    const [state,dispatch] =   useReducer(reduceFn,initialState);
    

    return(
        <MatchContext.Provider value={{match,state,dispatch}}>
            {childeren}
        </MatchContext.Provider>
    )

}

export const MatchStateCentral = ()=> useContext(MatchContext);