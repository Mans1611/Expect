import Person from '@mui/icons-material/Person'
import React from 'react'
import Axios from '../../../Axios/axios';

const Invitation = ({invition}) => {
    const handleSend = async (type)=>{
        if(type === "Accept"){
            const response = await Axios.put('/pvp/acceptinvitation',{
                sender : invition.sender,
                reciever : invition.reciever,
                roomId : invition.roomId 
            });
            console.log(response.data);
        }
        else{

        }
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