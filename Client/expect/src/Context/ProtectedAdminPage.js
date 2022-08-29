import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../adminPage/Context/ProtectedAdmin';

const ProtectedAdminPage = ({childern}) => {
  const navigate = useNavigate();
  const {adminAuth} = AdminContext();
  
  useEffect(()=>{
    if(!adminAuth)
        return navigate('/adminpage/login');
  },[]);

    return (
    childern
  )
}

export default ProtectedAdminPage