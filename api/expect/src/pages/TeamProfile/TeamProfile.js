import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import './teamProfile.scss';
import Axios from '../../Axios/axios';
import { globalUser } from '../../Context/HomeContext';
import Loading from '../../component/loading/big.loading/Loading';
import OtherTeamDetails from '../../component/TeamProfileComponent/OtherTeamDetails';

// this page is for team profile, so when user click on any team name it navigate him to this page to see other team details.
const TeamProfile = () => {
    const {teamName} = useParams();
    let isSubscribe = true;
    const {token , isAuth, isDark } = globalUser();
    
    //states of the component
    const [team, setTeam] = useState(null);
    const [isLoading,setLoading] = useState(true);

    useEffect(()=>{
        let subscribe = true;

        const fetchTeam = async()=>{
            const {data,status} = await Axios.get(`/team/${teamName}`,{
                headers : {
                    token
                }
                
            });
            if(subscribe)
                setTeam(data.team);

            setLoading(false);
        }
        if(subscribe) fetchTeam();

        ()=> subscribe = false; // cleanup function.
    },[])


    if(isLoading)
        return <Loading/> ; 
    
    return (
        <div className='teamProfile-page'>
            <OtherTeamDetails team = {team}/>
        </div>
    )
}

export default TeamProfile;