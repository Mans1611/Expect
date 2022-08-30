import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../adminPage/Context/ProtectedAdmin';

const ProtectedAdminPage = ({childern}) => {
  const navigate = useNavigate();
  const admin = AdminContext();
  
  useEffect(()=>{
    if(!admin.adminAuth && !admin.token)
        return navigate('/adminpage/login');
  },[]);

    return (
    childern
  )
}

export default ProtectedAdminPage