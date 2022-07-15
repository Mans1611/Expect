import { useState } from "react";
import {useContext,createContext } from "react";


export const userContext = createContext(null);

export const Provider = ({children})=>{
    const [isDark,setDark] = useState(false);
    const [userGlob,setUserGlob] = useState(null);
    const [auth,setAuth] = useState(false)
  
    

    return(
        <userContext.Provider value={{isDark,setDark,userGlob,setUserGlob,auth,setAuth}}>
            {children}
        </userContext.Provider>
        )
}

export const  globalUser = ()=> useContext(userContext);
