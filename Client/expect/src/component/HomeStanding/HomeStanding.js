import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { globalUser } from '../../Context/HomeContext';
import './homeStanding.scss' ;

const HomeStanding = () => {
    const {isDark} = globalUser();
    const [standing,setStanding] = useState([]);
    const cookie = new Cookies();

    useEffect(()=>{
        return async()=>{
            const response = await axios.get('/users/standing',{
                headers:{
                    token: cookie.get("token")
                }
            });
            setStanding(response.data);

        }
    },[])

    return ( 
        <div className = {`homeStanding ${isDark? 'dark' :''}`} >
            <div className="headline">
                <Link to='/expect/standing'>
                    Standing
                </Link>
            </div>
            <div className="tableHead">
                <div className="order">order</div>
                <div >UserName</div>
                <p>points</p>
            </div>
            {

                standing.map((user,index)=>(
                    <Player key={index} name={user.userName} order={index+1} points={user.userPoints}  />
                    ))
            }
        
       


        </div>
     );
}
 

const Player = ({name,order,points})=>{
    return (
        <div className="player">
            <div className="order">{order}</div>
            <Link className='playerLink'  to='/expect/matches'>{name}</Link>
            <p>{points}</p>
        </div>
    )
}
export default HomeStanding;