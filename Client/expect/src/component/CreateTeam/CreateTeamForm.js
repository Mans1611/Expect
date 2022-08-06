import { globalUser } from "../../Context/HomeContext";
import checkValidation from "../../utilis/CheckValidation";
import SmallLaoding from "../loading/small.loading/smallLoading";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { useContext, useState } from "react";
import './createTeamForm.scss';
import ClipBoardCopy from "./ClipBoard";
import { TeamContext } from "../TeamComponent/TeamComponent";

const CreateTeamForm = ()=>{
    const {userGlob} = globalUser();


    const [loading,setLoading] = useState(false);
    const [showTeamCode,setShowTeamCode] = useState(false);
    const [teamCode,setTeamCode] = useState('');
    const {setShowCreateTeam,setShowJoinTeam} = useContext(TeamContext);
    const handleCreatTeam = async(e)=>{
        e.preventDefault();
        setLoading(true)
        const teamName = document.getElementById('teamName').value;
        
        if(!checkValidation(teamName))
            return document.getElementById('teamErrMsg').innerHTML = 'Check The Team Name Agian';
        try{
            const requsetBody = {
                userName : userGlob,
                teamName
            }

            const response = await axios.post('/team/createteam',{
                body : JSON.stringify(requsetBody)
            })
            
            setTeamCode(response.data.teamCode);
            setShowTeamCode(true);
            setLoading(false);

        }

        catch(err){
            console.log(err);
        }
    }

   if(loading)
        return (<SmallLaoding/>)
    else {
        return (
            
            <div className="createTeamform">
               {
                showTeamCode ? 
               <ClipBoardCopy text = {teamCode}/>
                : 
                <form className='team-form'>
                    <input id='teamName' placeholder='Enter Team Name' type="text" name="teamName" />
                    <div className="button-Wrapper">
                        <button onClick={(e)=>{e.preventDefault();setShowCreateTeam(false);setShowJoinTeam(false)}} className='cancel'>Cancel <CancelIcon/> </button>
                        <button onClick={handleCreatTeam} className='generateCode'>Create Team <CheckCircleIcon/></button>
                    </div>
                </form>

                }   
            </div>
        )

            

        
            
        
    }
}

export default CreateTeamForm;