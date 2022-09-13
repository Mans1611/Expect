import React from 'react'
import '../TeamComponent/MyTeam/MyTeam.scss';
import TeamDetail from '../TeamComponent/MyTeam/TeamDetail/TeamDetail';
import TeamTable from '../TeamComponent/MyTeam/TeamTable/TeamTable';

const OtherTeamDetails = ({team}) => {
  return (
    <div className='myteam-container'> 
          <div className="myteamHeader">
              <div className="teamNameWrapper">
                
              <h1 className="teamName">{team.teamName}</h1>
              </div>
              <div className="details">
                <TeamDetail detail={team.teamStanding} detailTitle={"Team Standing"}/>
                <TeamDetail detail={team.teamPoints} detailTitle={"Total points"}/>
              </div>
          </div>
          <TeamTable teamMembers = {team.teamMembers}/>
          
        
  
    </div>
  )
}

export default OtherTeamDetails;