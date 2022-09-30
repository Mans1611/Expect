import React from 'react'
import './userissue.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Axios from '../../../Axios/axios';
import { AdminContext } from '../../Context/ProtectedAdmin';
import { useState } from 'react';


const UserIssue = ({feedback , support}) => {

    const {token} = AdminContext();
    const [verify,setVerify] = useState(null);

    const checkUser = async(e)=>{
        e.preventDefault();
        try{
            const {status} = await Axios.post('/feedback/checkEmail',
            // body of the request . 
            {email : feedback.email},
            // config
            {
                headers : {
                    token
                }
            })
            if(status === 200)
                setVerify('Verified');
            else{
                setVerify("Not verified");
            }

        }catch(err){
            console.log(err);
        }


    }
return (
    <div className='userFeedback'>
        <div className="icon-wrapper">
            <AccountCircleIcon/>
        </div>

        <div className="text-wrapper">
            <h2 className="email">{feedback.name}</h2>
            <h4 className="email">{new Date(feedback.time).toISOString()}</h4>
            {support && <h3>{feedback.problemType}</h3> }
            <p>{feedback.description}</p>

        </div>
        {
            support &&
            <div className="checkWrapper">
                {
                    verify ? 
                    <div className="verify">{verify}</div>  
                    : 
                    <button onClick={checkUser}>Check</button>
                }
            </div>
        }
    </div>
  )
}

export default UserIssue