
import react , {useState,useContext,createContext} from 'react' ; 
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';



const AdminProvider = createContext(null);

export const ProtectedAdminProvider = ({childern})=>{
    const [adminAuth,setAdminAuth] = useState(false);
    const cookie = new Cookies()
    const tokenInit = cookie.get("adminToken") || null ;
    const [token,setToken] = useState(tokenInit);
    return(
        <AdminProvider.Provider value= {{
            adminAuth,setAdminAuth,
            token, setToken
            }}>
            {childern}
        </AdminProvider.Provider>

    )
}

export const AdminContext = () => useContext(AdminProvider);


