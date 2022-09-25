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
            let isSubscribe = true;
            const fetchTopUsers = async()=>{
                try{
                    const {data} = await Axios.get('/users/standing?limit=5');
                    console.log(typeof(data))
                    if(isSubscribe && typeof(data) !== "object")  // since i send a msg as an object if there were no users. 
                        setUsers(data);

                    setLoading(false);
                }catch(err){
                    console.log(err);
                }
            }
            fetchTopUsers();
            
            return ()=> isSubscribe = false;
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
                            users.length === 0 ?
                            <div style={{color:"#ffffff"}} className="noContent">No Users Yet</div>
                            :
                            users.map((user,index)=><UserAdmin_Row key={index} order = {index+1} user = {user} />)
                        }
                    
                </div>
            </div>
          )
    }


export default UserStanding