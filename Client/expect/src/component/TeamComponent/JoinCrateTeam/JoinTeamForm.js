import { useContext, useState } from "react";
import { TeamContext } from "../TeamComponent";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { globalUser } from "../../../Context/HomeContext";
import Axios from "../../../Axios/axios";


const JoinTeamForm = ()=>{
    const {userGlob} = globalUser();
    
    const {setShowJoinTeam,setShowCreateTeam} = useContext(TeamContext) ;
    const [loading,setLoading] = useState(false);
    const [showMsg,setShowMsg] = useState(false);
    const [msg,setMsg] = useState('');
    const [msgColor,setMsgColor] = useState('danger')
    const handleJoinTeam = async(e)=>{
        e.preventDefault();
        const teamCode = document.getElementById('teamCode').value
        try{
            setLoading(true)
            const requsetBody = {
                userName : userGlob,
                teamCode
            }
            
            const response = await Axios.put('/team/jointeam',{
                data :  JSON.stringify(requsetBody)
            })
            if(response.status >= 400){
                setMsg(response.data)
                setShowMsg(true)
            }
            else{ 
               console.log(response);
               setMsg(response.data);
               setMsgColor('green')
               setShowMsg(true);

            }
            setLoading(false);

        }

        catch(err){
            console.log(err);
        }
        
    }


    return(
        <form className='team-form'>
            <input id='teamCode' placeholder='Paste Team Code ' type="text" name="teamName" />
            {  showMsg &&  <div className={`invalid-msg ${ msgColor==='green' ? 'green' : 'danger'}`}>{msg}</div> } 
            <div className="button-Wrapper">
                <button onClick={(e)=>{e.preventDefault();setShowJoinTeam(false)}} className='cancel'>Cancel <CancelIcon/> </button>
                <button onClick={handleJoinTeam} className='generateCode'>Join Team <CheckCircleIcon/></button>
            </div>
    </form>
    )
}


export default JoinTeamForm