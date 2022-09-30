import './statistics.scss'
import { useEffect } from "react";
import TotalStatistics from "../../component/TotalComponent/TotalStatistics";
import UserStanding from "../../component/Standing/UserStanding";
import TeamStanding from "../../component/Standing/TeamStanding";
import ExtraStatistics from "../../component/ExtraStatistics/ExtraStatistics";

const Statistics = () => {    
    return ( 
        <div className="statistics">
           <TotalStatistics/>
           <div className="standing-Admin">
                <UserStanding totalUsers={true}/>
                <TeamStanding/>
           </div>
           <ExtraStatistics/>
        </div>
     );
}
 
export default Statistics;