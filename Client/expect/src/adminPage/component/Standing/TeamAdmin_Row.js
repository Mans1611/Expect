import React from 'react'
import { globalUser } from '../../../Context/HomeContext'

const TeamAdmin_Row = ({team,order}) => {
    const {userGlob} = globalUser();
    let val = null;

    //val = team.teamMembers.find((member) => member.userName === userGlob)
  return (
    <div className='users-row'>
        <div className={ `row teams ${ val ? 'highligetd':''}`}>
            <span className="field">{order}</span>
            <span className="field">{team.teamName}</span>
            <span className="field">{team.noMembers}</span>
            <span className="field">{team.points}</span>
        </div>
    </div>
    )
}

export default TeamAdmin_Row