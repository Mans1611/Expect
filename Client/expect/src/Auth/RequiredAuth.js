import { Navigate, useNavigate,useLocation } from "react-router-dom";
import { globalUser } from "../Context/HomeContext"
import Cookies from 'universal-cookie';
import { useEffect } from "react";
import Axios from "../Axios/axios";

const RequiredAuth = ({childern})=>{
    const store = globalUser();
    const location = useLocation();
    const cookie = new Cookies();
    const navigate = useNavigate();

    useEffect(()=>{
        const session_id = cookie.get("connect.sid");
        const verifySession = async ()=>{
            try{
                const {data} = await Axios.post('/register/verifySession',{session_id});
                if(data.user){
                    store.setAuth(true);
                    store.setUserGlob(data.user.userName);
                    let page = localStorage.getItem('page') || 'home';
                    navigate(`/expect/${page}`);
                }
                else if(data.user === null) {
                    navigate('/register/signin')
                    store.setUserGlob(null);
                    store.setAuth(false);
                }
                }

            catch(err){
                console.log(err);
            }
        }
        if(session_id){
            verifySession();
        }
        
    },[])

   
    return childern;

}

export default RequiredAuth;