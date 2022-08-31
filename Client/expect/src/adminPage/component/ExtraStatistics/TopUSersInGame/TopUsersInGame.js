import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import Axios from '../../../../Axios/axios';
import { RoundUserRow } from '../../RoundStanding/RoundUserStanding';
import './topusersingame.scss';
import {AdminContext} from '../../../Context/ProtectedAdmin';
const TopUsersInGame = () => {

    const [users,setUsers] = useState([]);
    const [msg,setMsg] = useState(null);
    const matchIdInput = useRef(null)
    const { token } = AdminContext();
    console.log(token);

    const fetchUsers = async()=>{
        const matchId = matchIdInput.current.value.trim();
        if(! matchIdInput.current.value || matchId === '' )
            return setMsg("Please Provide MatchId")
        try{
            const {data} = await Axios.get(`/statistics/topusersinmatch/${matchId}`,{
                headers : {
                    token
                }
            })
            setUsers(data);
            console.log(data);
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='TopUsersInGame-containetr'>
        <div className="search-Wrapper">
            <input onFocus={()=>setMsg(null)} ref={matchIdInput} placeholder='Enter Match Id' type="text" className="searchfield" />
            <button onClick={fetchUsers} className="search">GET</button>
        </div>

        <div className="standing-header row round">
            <span className="field">No</span>
            <span className="field">User Name</span>
            <span className="field">Match Points</span>
        </div>
        {
            users.length === 0 ? <div className="noContent"></div> 
             :
             users?.map((user,index) => <RoundUserRow matchStanding={true} order={index+1} user = {user} />)
        }

    </div>
  )
}

export default TopUsersInGame;