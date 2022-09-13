import React from 'react'

const UserAdmin_Row = ({user,order}) => {

    return (
      <div className='users-row'>
          <div className='row'>
              <span className="field">{order}</span>
              <span className="field">{user.userName}</span>
              <span className="field">{user.phoneNumber?user.phoneNumber : "Not-Provided" }</span>
              <span className="field">{user.userCountry.toUpperCase()}</span>
              <span className="field">{user.userPoints}</span>
          </div>
      </div>
    )
  }


export default UserAdmin_Row