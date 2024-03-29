import React from 'react'
import { Link } from 'react-router-dom';
import { globalUser } from '../../../Context/HomeContext'

const TeamAdmin_Row = ({team,order}) => {
    const {userGlob} = globalUser();
    let val = null;

    //val = team.teamMembers.find((member) => member.userName === userGlob)
  return (
    <div className='users-row'>
        <Link to={`/teams/${team.teamName}`}>
            <div className={ `row teams ${ val ? 'highligetd':''}`}>
                <span className="field">{order}</span>
                <span className="field">{team.teamName}</span>
                <span className="field">{team.teamMembers.length}</span>
                <span className="field">{team.teamPoints}</span>
            </div>
        </Link>
    </div>
    )
}

export default TeamAdmin_Row