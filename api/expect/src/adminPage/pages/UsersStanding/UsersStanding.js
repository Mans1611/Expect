import './userStanding.scss';

import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from '../../../Axios/axios';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import UserAdminHeadRow from '../../component/Standing/UserAdminHeadRow';
import UserAdmin_Row from '../../component/Standing/UserAdmin_Row';
import { AdminContext } from '../../Context/ProtectedAdmin';
import {RedirectToLoginPage} from '../../Context/RedirectToLoginPage';

const UsersStanding = () => {
 

  const [isLoading,setLoading] = useState(true);
  const [start,setStart] = useState(1);
  const {token,setAdminAuth,setToken} = AdminContext();
  const navigate = useNavigate();
  const [users,setUsers] = useState([])
  let [totalUsers] = useState([]);
 
  useEffect(()=>{
    let isSubscrbe = true;
    setLoading(true);
   
    const fetchUsers = async()=>{
      try{
        const {data,status} = await Axios.get(`/users/standingforAdmins?start=${start}`,{
          headers : {
            token  
          }
        });
        
        if(status >= 400){
          setLoading(false); 
          setAdminAuth(false);
          setToken(null);
          return navigate('/adminpage/login');
        }


        if(totalUsers.length > 0) {
          if(totalUsers[totalUsers.length-1].userName !== data[0].userName)
            totalUsers.push(...data);
        }
        else{
          totalUsers.push(...data);
        }
        setLoading(false);
      } catch(err){
        console.log(err);
      }
    }

    if(isSubscrbe) fetchUsers();

    return ()=> isSubscrbe = false;
      
  

  },[start])
  
  return (
    <div className='usersStanding'>
      <h1> Users Standing</h1>
      <div className="tableContainer">   
        <UserAdminHeadRow/>
        {
          isLoading ? <SmallLaoding/> : 
          totalUsers.map((user,index)=><UserAdmin_Row user ={user} key={index} order = {index+1}/>)
        }
      </div>
      <div className="button-wrapper">
        <button onClick={()=>setStart(start=>start+1)} className="increase">Show More</button>
      </div>
    </div>
  )
}

export default UsersStanding