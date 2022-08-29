
import react , {useState,useContext,createContext} from 'react' ; 
import { useNavigate } from 'react-router-dom';



const AdminProvider = createContext(null);

export const ProtectedAdminProvider = ({childern})=>{
    const [adminAuth,setAdminAuth] = useState(false);
    const [token,setToken] = useState(null);

    console.log("render context");
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


