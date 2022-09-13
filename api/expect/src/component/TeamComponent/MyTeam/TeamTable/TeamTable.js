import React from 'react'
import UserRow from './UserRow'
import {Link} from 'react-router-dom';

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
              <Link key={index} to = {`/myprofile/${member.userName}`}>
                <UserRow key={index} standing={index+1} userName={member.userName} sharePoints={member.sharePoints}/>
              </Link>
              )

            }

        </div>
    </div>
  )
}

export default TeamTable