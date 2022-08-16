import React from 'react'
import { globalUser } from '../../../../Context/HomeContext'

const UserRow = ({standing,userName,sharePoints}) => {
  const {userGlob} = globalUser();
  return (
    <div className={`tableRow user ${(userGlob ===userName)? 'myuser' : null }`}>
        <span className="tableHead-item">{standing}</span>
        <span className="tableHead-item">{userName}</span>
        <span className="tableHead-item">{sharePoints}</span>
    </div>
  )
}

export default UserRow