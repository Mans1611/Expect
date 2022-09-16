import React, {useEffect, useState} from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import Axios from '../../../Axios/axios';
import Invitation from './Invitation';
import { globalUser } from '../../../Context/HomeContext';



const Invitations = () => {

    const [shownotifications,setShowNotifications] = useState(false);
   
    
    const {userGlob,invitions,setInvitations,number,setNumber} = globalUser();

    useEffect(()=>{
        let isSubscribe = true;

        const fetchInvitations = async()=>{
            const {data} = await Axios.get(`/pvp/invitations/${userGlob}`);

            if(isSubscribe)
                setInvitations(data); 
                setNumber(data.length)  
        }

        fetchInvitations();
        ()=> isSubscribe = false;
    },[])



  return (
    <div  className="notification-container">
        <NotificationsIcon onClick={()=> setShowNotifications(!shownotifications)} />
        {
            number === 0 ? null :
            <div className="red-circle">{number}</div>
        }
    {shownotifications &&
    <div className="notifcations-Content">
        {invitions.map((invition,index)=> <Invitation invition={invition} key = {index}/>
        )}
        
    </div>
    
    }
</div>
  )
}

export default Invitations