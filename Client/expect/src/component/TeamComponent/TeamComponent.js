import './teamComp.scss';

import React, {useState,createContext} from 'react'
import { Link, Routes,Route,useLocation } from 'react-router-dom';
import MyTeam from './MyTeam/MyTeam';
import CreateJoinTeam from './JoinCrateTeam/CreateJoinTeam';
import { globalUser } from '../../Context/HomeContext';

export const TeamContext = createContext(null);

const TeamComponent = () => {
    const {isDark} = globalUser();

    const [showcreateTeam, setShowCreateTeam] = useState(false);
    const [showJoinTeam, setShowJoinTeam] = useState(false);

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

  return (
    <TeamContext.Provider value={{
        showcreateTeam,setShowCreateTeam,
        showJoinTeam, setShowJoinTeam
        }}>

        <div className={`TeamComponent-containetr ${isDark ? 'dark' : null}`}>
        <div className="TeamComponent">
            <div className="teamNavbar">
                <ul>
                    <Link to='myTeam'><li id='myTeam' className='navbar-item first'> My Team</li></Link>
                    <Link to='teamjoin'> <li id ='teamjoin' className='navbar-item second'>Create Or Join Team</li></Link>
                </ul>
            </div>
            <div className="teamContent">
                <Routes>
                    <Route path='' element={<TeamInstructions/>}></Route>
                    <Route path="myTeam" element={<MyTeam />} />
                    <Route path="teamjoin" element={ <CreateJoinTeam  />} />
                </Routes>
            </div>

        </div>
        </div>
    </TeamContext.Provider>
  )
}



const TeamInstructions = ()=>{
    return (
        <div className="teamInstruction">
            Instructions
        </div>
    )
}

export default TeamComponent