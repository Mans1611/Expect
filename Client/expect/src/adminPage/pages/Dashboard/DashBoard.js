import TodayMatches from "../../component/TodaysMatches/TodayMatches";
import TotalStatistics from "../../component/TotalComponent/TotalStatistics";
import { AdminContext } from "../../Context/ProtectedAdmin";
import './dashboard.scss';

const DashBoard = () => {
    const {isAuth,setAdminAuth} = AdminContext()
    console.log(isAuth);
    return ( 
        <div className="dashboard">
            <TotalStatistics/>
            <TodayMatches/>
        </div>
     );
}
 
export default DashBoard;