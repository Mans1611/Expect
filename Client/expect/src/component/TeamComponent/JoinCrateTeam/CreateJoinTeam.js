import React, { useState,useContext } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { TeamContext } from '../TeamComponent'
import { globalUser } from '../../../Context/HomeContext';
import checkValidation from '../../../utilis/CheckValidation';
import axios from 'axios';
import CreateTeamForm from '../../CreateTeam/CreateTeamForm';


const CreateJoinTeam = () => {
    
    
    const {
        showcreateTeam,setShowCreateTeam,
        showJoinTeam, setShowJoinTeam
    } = useContext(TeamContext)
    
    const { userGlob } = globalUser();
    // states 
   
    // handle 

    
    const handleJoinTeam = (e)=>{
        e.preventDefault();
        setLoading(true);
        //const teamCode = document.getElementById('teamCode').value;
        
    }


    return (
    <div className='teamJoin'>
        <div className="options">
            { !showcreateTeam && !showJoinTeam &&
                <button onClick={()=>setShowCreateTeam(!showcreateTeam)}>Create Team</button>
            }
            {
                showcreateTeam && <CreateTeamForm/>
            }
            {
                !showcreateTeam && !showJoinTeam &&
                <button  onClick={(e)=>{e.preventDefault();setShowJoinTeam(!showJoinTeam);setShowCreateTeam(false)}}>Join Team</button>
                
            }
             { showJoinTeam && !showcreateTeam &&
                <form className='team-form'>
                <input id='teamCode' placeholder='Paste Team Code ' type="text" name="teamName" />
                <div className="button-Wrapper">
                    <button onClick={(e)=>{e.preventDefault();setShowJoinTeam(false)}} className='cancel'>Cancel <CancelIcon/> </button>
                    <button onClick={handleJoinTeam} className='generateCode'>Join Team <CheckCircleIcon/></button>
                </div>
            </form>
            }{

           <div className="sendCode">

            </div> 
        }
        </div>
    </div>
  )
}

export default CreateJoinTeam