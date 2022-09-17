import { useEffect, useState } from "react";
import {useContext,createContext } from "react";
import Axios from "../Axios/axios";


export const userContext = createContext(null);

export const Provider = ({children})=>{
    const theme = localStorage.getItem("isDark") === 'true' ? true : false;
   
    const [isDark,setDark] = useState(theme);
    const [userGlob,setUserGlob] = useState(null);
    const [auth,setAuth] = useState(false);
    const [expectedMatches,setExpected] = useState([]);
    const [token,setToken] = useState(null);
    const [invitions,setInvitations] = useState([]);
    const [number,setNumber] = useState(0); // for number of notifications.
    const [user,setUser] = useState({});
    return(
        <userContext.Provider value={{
            isDark,setDark,
            userGlob,setUserGlob,
            auth,setAuth,
            expectedMatches,setExpected,
            token,setToken,
            invitions,setInvitations,
            number,setNumber,
            user,setUser
            }}>
            {children}
        </userContext.Provider>
        )
}

export const globalUser = ()=> useContext(userContext);
