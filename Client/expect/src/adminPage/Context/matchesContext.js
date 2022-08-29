import { useState } from "react";
import { createContext,useContext } from "react";

export const matchesContext = createContext(null);

export const MatchesProvider = ({childern})=>{
    const [matches,setMatches]= useState([]);
    const [isLoading,setLoading]= useState(true);
    const [player1_state,setPlayer_1_state]= useState(null);
    const [player2_state,setPlayer_2_state]= useState(null);

    return ( 
    <matchesContext.Provider value = {{
        matches,setMatches,
        isLoading,setLoading,
        player1_state,setPlayer_1_state,
        player2_state,setPlayer_2_state
    
    }}>
        {childern}
    </matchesContext.Provider>
    )
}

export const  matchesStore = () => useContext(matchesContext);
