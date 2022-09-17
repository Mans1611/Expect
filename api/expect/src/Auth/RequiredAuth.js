import { Navigate, useNavigate } from "react-router-dom";
import { globalUser } from "../Context/HomeContext"
import Cookies from 'universal-cookie';
import { useEffect } from "react";
import Axios from "../Axios/axios";

const RequiredAuth = ({childern})=>{
    const store = globalUser();
    const cookie = new Cookies();
    const navigate = useNavigate();

    useEffect(()=>{
        const session_id = cookie.get("connect.sid");
        const token = cookie.get("token");

        const verifySession = async ()=>{
            try{
                const {data} = await Axios.post('/register/verifySession',{session_id});
                
                
              
                if(data.user && token){
                    store.setToken(token)
                    cookie.set("token",token,{
                        maxAge : 3600 // for one 
                    });


                    store.setAuth(true);
                    store.setUserGlob(data.user.userName);
                    let page = localStorage.getItem('page') || 'home';
                    navigate(`/${page}`);

                }
                else if(data.user === null || !token) {
                    navigate('/register/signin')
                    store.setUserGlob(null);
                    store.setAuth(false);
                   
                }
                }

            catch(err){
                console.log(err);
            }
        }
        
        // if(session_id ||token){
        //     verifySession();
        // }else{
        //     navigate('/register/signin')
        // }
        
    },[])

   
    return childern;

}

export default RequiredAuth;