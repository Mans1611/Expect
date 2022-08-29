import Axios from "../../../Axios/axios";
import PlayersToExpect from "../../../component/PlayersToExpect/PlayersToExpect";
import TodayMatches from "../../component/TodaysMatches/TodayMatches";
import TotalStatistics from "../../component/TotalComponent/TotalStatistics";
import { AdminContext } from "../../Context/ProtectedAdmin";
import {useState} from 'react'
import './dashboard.scss';

const DashBoard = () => {
    const {adminAuth,setAdminAuth} = AdminContext();
    
    const handleDeletePlayers = async()=>{
        try{
            
            const response = await Axios.delete('/statistics/deleterecomendation');
            if(response.status === 200){
                
            }
        }catch(err){
            console.log(err);
        }
    }
    return ( 
        <div className="dashboard">
            <TotalStatistics/>
            <TodayMatches/>
            <>
                <PlayersToExpect isLoading = {isLoading} setLoading = {setLoading} Players={Players} setPlayers={setPlayers}  dark={true}/>
                { Players.length !== 0 && 
                <div className="button-deleteWrapper">
                    <button onClick={handleDeletePlayers}>Delete All</button>
                </div>}
            </>
        </div>
     );
}
 
export default DashBoard;