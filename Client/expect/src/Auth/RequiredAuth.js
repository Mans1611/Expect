import { Navigate, useNavigate } from "react-router-dom";
import { globalUser } from "../Context/HomeContext"


const RequiredAuth = ({childern})=>{
    const store = globalUser();
    if(!store.auth){
       return <Navigate to='/register/signup'/>
    }
    return childern;

}

export default RequiredAuth;