import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Axios from '../../Axios/axios';
import { globalUser } from '../../Context/HomeContext';
import SmallLaoding from '../loading/small.loading/smallLoading';
import './homeStanding.scss' ;

const HomeStanding = () => {
    const navigate = useNavigate();
    const {isDark,token} = globalUser();
    const [standing,setStanding] = useState([]);
    const [isLoading,setLoading] = useState(true);

    const cookie = new Cookies();

    useEffect(()=>{
        let isSubscribe = true;

        const fetchStanding = async()=>{
            const response = await Axios.get('/users/standing',{
                headers : {
                    token : token || cookie.get("token")
                }
            });
            if(response.status === 203){
                const token = cookie.get('token'); 
                if(token){
                    cookie.remove('token');
                }
                navigate('/register/signin');
            }
            else{
                if(isSubscribe)
                    setStanding(response.data);
            }
            setLoading(false);

        }
        fetchStanding();
        return ()=> isSubscribe = false;
    },[])

    return ( 
        <div className = {`homeStanding ${isDark? 'dark' :''}`} >
            <div className="headline">
                <Link to='/standing'>Standing</Link>
            </div>
            <div className="tableHead">
                <div className="order">NO</div>
                <div>UserName</div>
                <p>points</p>
            </div>
            {
                isLoading ? 
                <SmallLaoding/> 
                :
                standing.map((user,index)=>(
                    <Player key={index} name={user.userName} order={index+1} points={user.userPoints}/>
                    ))
            }
        
       


        </div>
     );
}
 

const Player = ({name,order,points})=>{
    return (
        <div className="player">
            <div className="order">{order}</div>
            <Link className='playerLink'  to={`/myprofile/${name}`}>{name}</Link>
            <p>{points}</p>
        </div>
    )
}
export default HomeStanding;