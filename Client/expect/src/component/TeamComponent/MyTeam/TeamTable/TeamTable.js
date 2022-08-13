import React from 'react'
import UserRow from './UserRow'

const TeamTable = () => {
  return (
    <div className='teamTable'>
        <div className="teamTableTitle">Team Standing</div>
        <div className="table-Container">
            <div className="tableRow">
                <span className="tableHead-item">Standing</span>
                <span className="tableHead-item">UserName</span>
                <span className="tableHead-item">Share Points</span>
            </div>
            <UserRow standing={1} userName={"mans"} sharePoints={"18pt"}/>
            <UserRow standing={2} userName={"mans1211"} sharePoints={"12pt"}/>


        </div>
    </div>
  )
}

export default TeamTable