import './MyTeam.scss';
import React, {useContext, useEffect, useState} from 'react'
import ClipBoardCopy from '../../CreateTeam/ClipBoard';
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
  document.body.style.overflow = 'visible';
  const [showClipBoard,setShowClipBoard] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const [warnMsg,setWarnMsg] = useState(false);
  const {userGlob} = globalUser();
  const {user_team,setUserTeam , loading,setLoading,totalPoints} = useContext(TeamContext);
  const [confirm,setConfirm] = useState(false);




  const handleLeave = async(e)=>{
    e.preventDefault();
    if(user_team.teamMembers.length === 1  && !confirm ){
      setWarnMsg(true);
      setConfirm(true);
      return ; 
    }
    else if (warnMsg || user_team.teamMembers.length !== 1 ){

      try{
        setWarnMsg(false)
        setLoading(true);
        const response = await Axios.put('/team/leaveteam',{userName:userGlob});
        if(response.status === 200)
        setUserTeam(null);
        setLoading(false);
      }catch(err){
        console.log(err);
      }
    }
  }
  // useEffect(()=>{

  // },[])
  if(( user_team === '' || !user_team) && !loading )
    return <TeamInstructions/>
  
  return (
    <div className='myteam-container'>
      { loading ? <SmallLaoding/> :
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
                  user_team.teamMembers.map((member, index) =>{
                    if(member.userName === userGlob)
                        return <TeamDetail key={index} detail={member.sharePoints} detailTitle={"Your Share"}/>
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
          {warnMsg && <PopWarnMsg handleLeave = {handleLeave} setWarnMsg ={setWarnMsg} setConfirm={setConfirm } />}
        </>
  }
    </div>
  )
}

const PopWarnMsg = ({handleLeave,setWarnMsg,setConfirm})=>{
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  return(
    <div className="popup-contianer">
      <div className="boxmsg">
        <h2>Warning !</h2>
        <p>You are the last one in this team. If You leave, all your team data will be erased</p>
        <div className="buttons-container">
          <button onClick={()=> {setWarnMsg(false);setConfirm(false)}} className="green">Cancel</button>
          <button onClick={handleLeave} className="danger">Confirm</button>
      </div>
     </div>
    
    </div>
  )
}
export default MyTeam;
