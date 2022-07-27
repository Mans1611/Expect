import { AdminContext } from "../../Context/ProtectedAdmin";

const DashBoard = () => {
    const {isAuth,setAuth} = AdminContext()
    console.log(isAuth);
    return ( 
        <div className="dashboard">
            DashBoard idiot
        </div>
     );
}
 
export default DashBoard;