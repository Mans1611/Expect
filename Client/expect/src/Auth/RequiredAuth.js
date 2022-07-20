import { Navigate, useNavigate,useLocation } from "react-router-dom";
import { globalUser } from "../Context/HomeContext"


const RequiredAuth = ({childern})=>{
    const store = globalUser();
    const location = useLocation()
    if(!store.auth){
       return <Navigate to='/register/signin' state = {{path:location.pathname}}/>
    }
    return childern;

}

export default RequiredAuth;