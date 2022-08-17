import React, {useState,useEffect} from 'react'
import Axios from '../../../Axios/axios';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import TeamAdmin_Row from './TeamAdmin_Row';

const TeamStanding = () => {
  const [isLoading,setLoading] = useState(true);
  const [teams,setTeams] = useState([]);

  useEffect(()=>{
    return async ()=>{
        const {data} = await Axios.get('/team/teamStanding?limit=5'); // i specifiy the limit top 5 team.
        setTeams(data);
        setLoading(false); 
    }
  })
  
  return (
    <div className='teamStanding'>
        <div className="standing-container">
            <h1 className='team'>Teams Standing</h1>
            <div className="standing-header row teams">
                <span className="field">No</span>
                <span className="field">Team Name</span>
                <span className="field">Members</span>
                <span className="field">Status</span>
                
            </div>
            {
              isLoading ? <SmallLaoding/>
              :
              teams.map((team,index)=><TeamAdmin_Row key={index} order = {index+1} team={team}/>)
            }
            
        </div>

    </div>
  )
}

export default TeamStanding