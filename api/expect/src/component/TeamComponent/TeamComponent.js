import './teamComp.scss';

import React, {useState,createContext, useEffect} from 'react'
import { Link, Routes,Route,useLocation } from 'react-router-dom';
import MyTeam from './MyTeam/MyTeam';
import CreateJoinTeam from './JoinCrateTeam/CreateJoinTeam';
import { globalUser } from '../../Context/HomeContext';
import Axios from '../../Axios/axios';
import TeamStanding from '../../adminPage/component/Standing/TeamStanding';
export const TeamContext = createContext(null);

const TeamComponent = () => {
    const {isDark, userGlob} = globalUser();
   
    const [showcreateTeam, setShowCreateTeam] = useState(false);
    const [showJoinTeam, setShowJoinTeam] = useState(false);
    const [user_team,setUserTeam] = useState(null);
    const [userTeamExpects,setUserTeamExpects] = useState([]);
    const [totalPoints,setTotalTeamPoints]  = useState(0);
    const [loading,setLoading] = useState(true)
    let location = useLocation().pathname.split("/")[3]; 
    let item = document.getElementById(location)

    if(item)
        item.classList.add("selected");
    
    const navBar_Items = document.getElementsByClassName('navbar-item');
    
    for(let item of navBar_Items){
        item.addEventListener('click',function(){
            const previous = document.getElementsByClassName('selected')[0];
           
            if(previous){
                previous.className = previous.className.replace(" selected","")
            }
        })
    } 

    useEffect(()=>{
        let isSubscribe = true;
        
        const fetchTeam =  async()=>{
          const {data} = await Axios.get(`/team/myteam/${userGlob}`);
          if(isSubscribe){
              setUserTeam(data.team);
              setUserTeamExpects(data.expect);
              setTotalTeamPoints(data.totalTeamPoints);
          }
          setLoading(false);
        }
        fetchTeam()
        return ()=> isSubscribe = false;

      },[])

  return (
    <TeamContext.Provider value={{
        showcreateTeam,setShowCreateTeam,
        showJoinTeam, setShowJoinTeam,
        user_team,setUserTeam,
        userTeamExpects,setUserTeamExpects,
        loading,setLoading,
        totalPoints
        }}>

        <div className={`TeamComponent-containetr ${isDark ? 'dark' : ''}`}>

            <div className="TeamComponent">
                <div className="teamNavbar">
                    <ul>
                        <Link to='/team/myTeam'><li id='myTeam' className='navbar-item first'> My Team</li></Link>
                        <Link to='/team/teamjoin'> <li id ='teamjoin' className='navbar-item second'>Create-Join Team</li></Link>
                    </ul>
                </div>
                <div className="teamContent">
                    <Routes>
                        <Route path="myTeam" element={<MyTeam />} />
                        <Route path="teamjoin" element={ <CreateJoinTeam  />} />
                    </Routes>
                </div>
            </div>
            <TeamStanding />
        </div>
    </TeamContext.Provider>
  )
}





export default TeamComponent