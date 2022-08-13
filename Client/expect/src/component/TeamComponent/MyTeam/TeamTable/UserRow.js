import React from 'react'

const UserRow = ({standing,userName,sharePoints}) => {
  return (
    <div className="tableRow user">
        <span className="tableHead-item">{standing}</span>
        <span className="tableHead-item">{userName}</span>
        <span className="tableHead-item">{sharePoints}</span>
    </div>
  )
}

export default UserRow