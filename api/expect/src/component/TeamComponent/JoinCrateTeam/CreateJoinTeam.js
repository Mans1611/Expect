import React, { useState,useContext,useEffect } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { TeamContext } from '../TeamComponent'
import { globalUser } from '../../../Context/HomeContext';
import checkValidation from '../../../utilis/CheckValidation';
import axios from 'axios';
import CreateTeamForm from '../../CreateTeam/CreateTeamForm';
import JoinTeamForm from './JoinTeamForm';


const CreateJoinTeam = () => {
    
    
    const {
            showcreateTeam,setShowCreateTeam,
            showJoinTeam, setShowJoinTeam
          } = useContext(TeamContext)

          useEffect(()=>{
            const previous = document.getElementsByClassName('selected')[0];
                
                if(previous){
                    previous.className = previous.className.replace(" selected","")
                }
        },[])
    

    return (
    <div className='teamJoin'>
        <div className="options">
            { !showcreateTeam && !showJoinTeam &&
                <button onClick={()=>setShowCreateTeam(!showcreateTeam)}>Create Team</button>
            }
            { showcreateTeam && <CreateTeamForm/> }
            
            {
                !showcreateTeam && !showJoinTeam &&
                <button  onClick={(e)=>{e.preventDefault();setShowJoinTeam(!showJoinTeam);setShowCreateTeam(false)}}>Join Team</button>
                
            }
             { showJoinTeam && !showcreateTeam && <JoinTeamForm/> }
            {

           <div className="sendCode">

            </div> 
        }
        </div>
    </div>
  )
}

export default CreateJoinTeam