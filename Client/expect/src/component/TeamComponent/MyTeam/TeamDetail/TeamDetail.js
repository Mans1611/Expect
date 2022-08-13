import React from 'react'

const TeamDetail = ({detailTitle,detail}) => {
  return (
    <div className='teamDetail'>
        <span className="deatil">{detail}</span>
        <span className="deatilTitle">{detailTitle}</span>
    </div>
  )
}

export default TeamDetail