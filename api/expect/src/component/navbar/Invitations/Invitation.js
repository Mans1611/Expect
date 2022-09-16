import Person from '@mui/icons-material/Person'
import React from 'react'
import Axios from '../../../Axios/axios';
import { globalUser } from '../../../Context/HomeContext';

const Invitation = ({invition}) => {
    const {invitions ,setInvitions} = globalUser();

    const handleSend = async (type)=>{
        if(type === "Accept"){
            const response = await Axios.put('/pvp/acceptinvitation',invition);
        }
        else{

        }

        let newInvitions = invitions.filter((invite)=>invite.roomId !== invition.roomId);
        setInvitions(newInvitions);

    }

  return (
    <>
        <div className='invitation'>
            <div className="invitation-flex">
                <Person/>
                <div className="invitations-body">
                    <span>{invition.sender}</span> sends  you an invitation to
                    <span> PVP </span> him for <span>{invition.matchTitle} </span>
                    Match
                </div>

            </div>
            <div className="invitation-buttons-wrapper">
                <button onClick = {()=>handleSend("Accept")} className=" Accept">Accept</button>
                <button onClick = {()=>handleSend("Decline")} className=" Decline">Decline</button>
            </div>
        </div>
    </>
  )
}

export default Invitation