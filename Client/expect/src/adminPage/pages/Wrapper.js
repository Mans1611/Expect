

import React from 'react'
import { AdminContext, ProtectedAdminProvider } from '../Context/ProtectedAdmin'

function Wrapper({childern}) {
  return (
    <ProtectedAdminProvider childern={childern}></ProtectedAdminProvider>
  )
}

export default Wrapper;