import React from 'react'

const PendingInvitiation = ({invitation}) => {
  return (
    <div>
        You have already send invitation to {invitation.reciever} for this match.
    </div>
  )
}

export default PendingInvitiation