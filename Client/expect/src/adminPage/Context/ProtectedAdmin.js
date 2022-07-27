

import react , {useState,useContext,createContext} from 'react' ; 


const AdminProvider = createContext(null)

export const ProtectedAdminProvider = ({childern})=>{
    const [isAuth,setAuth] = useState(false);
    
    return(
        <AdminProvider.Provider value= {{isAuth,setAuth}}>
            {childern}
        </AdminProvider.Provider>

    )
}

export const AdminContext = () => useContext(AdminProvider);


