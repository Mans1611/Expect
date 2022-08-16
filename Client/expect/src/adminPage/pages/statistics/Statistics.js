import { useEffect } from "react";
import TotalStatistics from "../../component/TotalComponent/TotalStatistics";
import './statistics.scss'
import UserStanding from "../../component/Standing/UserStanding";
import TeamStanding from "../../component/Standing/TeamStanding";
import ExtraStatistics from "../../component/ExtraStatistics/ExtraStatistics";

const Statistics = () => {    
    return ( 
        <div className="statistics">
           <TotalStatistics/>
           <div className="standing-Admin">
                <UserStanding/>
                <TeamStanding/>
           </div>
           <ExtraStatistics/>
        </div>
     );
}
 
export default Statistics;