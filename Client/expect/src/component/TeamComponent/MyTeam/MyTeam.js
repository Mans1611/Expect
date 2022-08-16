import React, {useContext, useEffect, useState} from 'react'
import ClipBoardCopy from '../../CreateTeam/ClipBoard';
import './MyTeam.scss';
import TeamDetail from './TeamDetail/TeamDetail';
import TeamTable from './TeamTable/TeamTable';
import { globalUser } from '../../../Context/HomeContext';
import { TeamContext } from '../TeamComponent';
import { Link } from 'react-router-dom';
import Axios from '../../../Axios/axios';
import SmallLaoding from '../../loading/small.loading/smallLoading';
import io from 'socket.io-client';
import TeamInstructions from './Instructions';

const soket = io.connect('http://localhost:8000');

const MyTeam = () => {
  const [showClipBoard,setShowClipBoard] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const [isLoading,setLoading] = useState(false);
  const {userGlob} = globalUser();
  const {user_team,setUserTeam ,userTeamExpects,setUserTeamExpects,totalPoints} = useContext(TeamContext);

  


  const handleLeave = async(e)=>{
    e.preventDefault();
    try{
        setLoading(true);
        const response = await Axios.put('/team/leaveteam',{userName:userGlob});
        if(response.status === 200)
          setUserTeam(null);

        setLoading(false);
    }catch(err){
      console.log(err);
    }
  }
  if(user_team === '' || !user_team)
    return <TeamInstructions/>
  
  return (
    <div className='myteam-container'>
      { isLoading ? <SmallLaoding/> :
        <>
          <div className="myteamHeader">
              <div className="teamNameWrapper">
                <h5>Your Team:</h5>
                <h1 className="teamName">{user_team.teamName}</h1>
              </div>
              <div className="details">
                <TeamDetail detail={user_team.teamStanding} detailTitle={"Team Standing"}/>
                <TeamDetail detail={totalPoints} detailTitle={"Total points"}/>
                {
                  user_team.teamMembers.map(member =>{
                    if(member.userName === userGlob)
                        return <TeamDetail detail={member.sharePoints} detailTitle={"Your Share"}/>
                  })
                }
              </div>
          </div>
          <TeamTable teamMembers = {user_team.teamMembers}/>
          <div className="options">
            <div className="button-Wrapper">
                <button  onClick={()=> setShowClipBoard(c=>!c)} className='button invite'>Invite Your Friends</button>
            </div>
            {showClipBoard && <ClipBoardCopy text={user_team.teamCode}/>}
            <div className="button-Wrapper">
                <button onClick={()=>setShowDelete(!showDelete)} className='button danger'>Leave Team</button>
            </div>
            {
              showDelete && 
              <div className="deleteWrapper">
                <button onClick={()=>setShowDelete(false)} className="green">Cancel</button>
                <button onClick={handleLeave} className="danger">Confirm</button>
              </div>
            }
          </div>
        </>
  }
    </div>
  )
}

export default MyTeam