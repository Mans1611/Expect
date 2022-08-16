import React from 'react'

const TeamAdmin_Row = ({team,order}) => {
  return (
    <div className='users-row'>
        <div className='row teams'>
            <span className="field">{order}</span>
            <span className="field">{team.teamName}</span>
            <span className="field">{team.noMembers}</span>
            <span className="field">{team.points}</span>
        </div>
    </div>
    )
}

export default TeamAdmin_Row