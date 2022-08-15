import React from 'react'
import UserRow from './UserRow'

const TeamTable = ({teamMembers}) => {
  return (
    <div className='teamTable'>
        <div className="teamTableTitle">Team Standing</div>
        <div className="table-Container">
            <div className="tableRow">
                <span className="tableHead-item">Standing</span>
                <span className="tableHead-item">UserName</span>
                <span className="tableHead-item">Share Points</span>
            </div>
            {
              teamMembers.map((member,index)=>
                <UserRow key={index} standing={index+1} userName={member.userName} sharePoints={member.sharePoints}/>
              )

            }

        </div>
    </div>
  )
}

export default TeamTable