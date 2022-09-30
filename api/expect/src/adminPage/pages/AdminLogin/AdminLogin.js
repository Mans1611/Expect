import './adminlogin.scss';
import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import { signInValidation } from '../../utilis/CreateNewAdminValidation';
import { AdminContext } from '../../Context/ProtectedAdmin';
import Cookies from 'universal-cookie';

const AdminLogin = ()=> {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [adminKey,setAdminKey] = useState('');
    const [msg,setMsg] = useState('');
    const [showMsg,setShowMsg] = useState(false);
    const navigate = useNavigate();
    const cookie = new Cookies();

    const adminStore = AdminContext();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await signInValidation(userName,password,adminKey);
            if(typeof(response) === "string"){
                setShowMsg(true);
                return setMsg(response);
            }
            if(response.status === 203){
                setShowMsg(true);
                return setMsg(response.data);
            }
           
            adminStore.setAdminAuth(true);
            adminStore.setToken(response.data.token);

            navigate('/adminpage/dashboard');

            cookie.set('adminToken',response.data.token,{
                maxAge : 60 * 60 * 4
            });


        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className='AdminLoginPage'>
        <div className="loginContainer">
            <h1 className='AdminLoginTitle'>Admin Login</h1>  
            <img src='https://cdn-icons-png.flaticon.com/512/2206/2206248.png' className='imgAdmin'/>
            <form>
                <div className="inputWrapper">
                    <label htmlFor="userName">UserName
                        <div className="input">
                        <PersonIcon className='icons'/>
                        <input onChange={(e)=>setUserName(e.target.value)} placeholder='Enter Your Admin User Name' type="text" id='userName' />
                        </div>
                    </label>
                </div> 
                <div className="inputWrapper">
                    <label htmlFor="password"> Password
                        <div className="input">
                        <LockIcon className='icons'/>
                        <input onChange={(e)=>setPassword(e.target.value)} placeholder=' Enter Your Password' type="password" id='password' />
                        </div>
                    </label>
                </div>

                <div className="inputWrapper">
                    <label htmlFor="secreteKey"> Admin Key
                        <div className="input">
                        <LockIcon className='icons'/>
                        <input onChange={(e)=>setAdminKey(e.target.value)} placeholder=' Enter Admin Key' type="password" id='secreteKey' />
                        </div>
                    </label>
                </div>
                {showMsg && <div className="msg">{msg}</div>}
                <Link to='/adminpage/signup'> Create Admin Account</Link>
                <button onClick={handleSubmit} type="submit">Log In</button>
            </form> 
        </div>
    </div>
  )
}

export default AdminLogin