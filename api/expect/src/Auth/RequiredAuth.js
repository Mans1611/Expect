import { Navigate, useNavigate } from "react-router-dom";
import { globalUser } from "../Context/HomeContext"
import Cookies from 'universal-cookie';
import { useEffect,useState } from "react";
import Axios from "../Axios/axios";
import Loading from '../component/loading/big.loading/Loading';


const RequiredAuth = ({childern})=>{
    const [isLoading,setLoading] = useState(true);
    
    
    const store = globalUser();
    const cookie = new Cookies();
    const navigate = useNavigate();

    useEffect(()=>{
        const session_id = cookie.get("expect_id");
        const token = cookie.get("token");
        let isSubscribe = true;



        const verifySession = async ()=>{
            try{
                const {data,status} = await Axios.post('/register/verifySession',{session_id});
                
                
                if(status === 404 ){
                    navigate('/register/signin')
                    store.setUserGlob(null);
                    store.setAuth(false);
                }
              
                if(data.userName && token && isSubscribe){
                    store.setToken(token)
                    cookie.set("token",token,{
                        maxAge : 3600 // for one 
                    });
                    store.setAuth(true);
                    store.setUserGlob(data.userName);

                    let page = localStorage.getItem('page') || 'home';
                    navigate(`/${page}`);

                }
                else if((data.userName === null || !token) && isSubscribe ) {
                    navigate('/register/signin')
                    store.setUserGlob(null);
                    store.setAuth(false);
                   
                }
                }

            catch(err){
                console.log(err);
            }
        }
        
        setLoading(false);

        if(session_id || token){
            verifySession();
        }else{
            console.log("not provided");
            navigate('/register/signin')
        }

        return ()=> isSubscribe = false;
        
    },[])

    if(isLoading)
        return <Loading/>


   
    return childern;

}

export default RequiredAuth;