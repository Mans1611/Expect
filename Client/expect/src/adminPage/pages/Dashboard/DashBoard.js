import { AdminContext } from "../../Context/ProtectedAdmin";

const DashBoard = () => {
    const {isAuth,setAdminAuth} = AdminContext()
    console.log(isAuth);
    return ( 
        <div className="dashboard">
            DashBoard idiot
        </div>
     );
}
 
export default DashBoard;