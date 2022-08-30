import React, {useState,useEffect} from 'react'
import './standing.scss';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import Axios from '../../../Axios/axios';
import UserAdmin_Row from './UserAdmin_Row';
import { Link } from 'react-router-dom';
import UserAdminHeadRow from './UserAdminHeadRow';
const UserStanding = ({totalUsers,selectedRound}) => {
    const [isLoading,setLoading] =useState(true);
    const [users,setUsers] = useState([]) 



        useEffect(()=>{
            return async()=>{
                const {data} = await Axios.get('/users/standing?limit=5');
                setUsers(data);
                setLoading(false);
            }
        },[])

        return (
            <div className='userStanding-admin'>
                <div className="standing-container">
                    <div className="header-wrapper">
                        <h1 className="title">User Standing</h1>
                        <div>
                            <Link to ='/adminpage/usersstanding'>See More</Link>
                        </div>
                    </div>
                    <UserAdminHeadRow/>
                    
                        {   isLoading ? <SmallLaoding/> : 
                            users.map((user,index)=><UserAdmin_Row key={index} order = {index+1} user = {user} />)
                        }
                    
                </div>
            </div>
          )
    }


export default UserStanding