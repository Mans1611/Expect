import './adminlogin.scss';
import React, { useState } from 'react'
import './adminlogin.scss';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CreateNewAdmin } from '../../utilis/CreateNewAdminValidation';
import { AdminContext } from '../../Context/ProtectedAdmin';
import Cookies from 'universal-cookie';

const HOURS = 60 * 60;

const cookie = new Cookies(); 

const AdminSignUp = ()=> {
    
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [rePassword,setRePassword] = useState('');
    const [adminKey,setAdminKey] = useState('');
    const [msg,setMsg] = useState(null);
    const [showMsg, setShowMsg] = useState(false);
    const navigate = useNavigate();

    const {isAuth,setAdminAuth} = AdminContext();


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await CreateNewAdmin(userName,password,rePassword,adminKey);
            if(typeof(response) == "string"){
                setShowMsg(true);
                return setMsg(response);
            }
            if(response.status === 201){
                cookie.set("token",response.headers.token,{
                    maxAge :  HOURS * 4 // for just one hour
                });
                setAdminAuth(true);
                navigate('/adminpage/dashboard');

            }
            else if(response.status === 203){
                setShowMsg(true);
                return setMsg(response.data);
            }

        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='AdminLoginPage'>
        <div className="loginContainer">
            <h1 className='AdminLoginTitle'>Admin Sign Up</h1>  
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
                    <label htmlFor="secreteKey"> Re-Passoword
                        <div className="input">
                        <LockIcon className='icons'/>
                        <input onChange={(e)=>setRePassword(e.target.value)} placeholder=' Re-Enter Password' type="password" id='secreteKey' />
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
                <Link to='/adminpage/login'>Already Have An Account</Link>
                <button onClick={handleSubmit} type="submit">Create Account</button>
            </form> 
        </div>
    </div>
 
  )
}

export default AdminSignUp