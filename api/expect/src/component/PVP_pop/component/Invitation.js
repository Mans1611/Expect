import React, { useReducer, useState } from 'react'
import Axios from '../../../Axios/axios';
import { InviteState, reduceInviteFn } from '../Reducer/invitationReducer';
import SmallLoading from '../../loading/small.loading/smallLoading';
import { globalUser } from '../../../Context/HomeContext';
import { MatchCardProvider } from '../../../Context/MatchCardContext';



const Invitation = ({matchId}) => {
    const {userGlob} = globalUser();

    const [inviteState,dispatch] = useReducer(reduceInviteFn,InviteState);
    const [isFetching,setFetching] = useState(false);

    const handleInvite = async (e)=>{

        e.preventDefault();
      

        
        
        let userName =document.getElementById('userName').value.trim() ; 

        if(userName === '' || !userName)
            return dispatch({type : 'empty'})
        
        if(userGlob === userName){
            return dispatch({type : 'sameUser'})
        }

        try{
            setFetching(true);
            const {data} = await Axios.post(`/pvp/invite`,{
                sender : userGlob,
                reciever : userName,
                matchId
            });

            if(data.found){
                dispatch({type : 'done'})
                setFetching(false)
            }
            else{
                dispatch({type : 'NotFound'});
                setFetching(false)
            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className="invetation-container">
        <h1>Enter your friend Username</h1>
        <input onFocus={()=>dispatch({type : 'hide'})} placeholder='UserName ' type="text" id='userName' />
        {inviteState.showMsg && 
            <div className={`msg ${inviteState.color}`}>
                {inviteState.msg}
            </div>
            }
        {
            isFetching   ? <SmallLoading/> : 
            inviteState.showButton ? 
                <button onClick={handleInvite} className='invite'>Invite</button> : 
                null 
        }
    </div>
  )
}

export default Invitation