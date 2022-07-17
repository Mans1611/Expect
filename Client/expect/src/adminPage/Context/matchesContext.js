import { useState } from "react";
import { createContext,useContext } from "react";

export const matchesContext = createContext(null);

export const MatchesProvider = ({childern})=>{
    const [matches,setMatches]= useState([]);
    const [isLoading,setLoading]= useState(true);
    return ( 
    <matchesContext.Provider value = {{matches,setMatches,isLoading,setLoading}}>
        {childern}
    </matchesContext.Provider>
    )
}

export const  matchesStore = () => useContext(matchesContext);
