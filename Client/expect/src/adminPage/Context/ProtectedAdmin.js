

import react , {useState,useContext,createContext} from 'react' ; 


const AdminProvider = createContext(null)

export const ProtectedAdminProvider = ({childern})=>{
    const [isAuth,setAdminAuth] = useState(false);
    
    return(
        <AdminProvider.Provider value= {{isAuth,setAdminAuth}}>
            {childern}
        </AdminProvider.Provider>

    )
}

export const AdminContext = () => useContext(AdminProvider);


