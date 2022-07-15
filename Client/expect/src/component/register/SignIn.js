import './signin.scss';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { globalUser } from '../../Context/HomeContext';
const SignIn = () => {
    const [userName,setUserName] = useState(null);
    const [password,setPassword] = useState(null);
    const navigate = useNavigate();
    const store = globalUser();
    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('/register/login',{userName,password});
            if(response.status === 200){
                store.setUserGlob(userName)
                store.setAuth(true)
                navigate('/expect/home');
            }
            else if(response.status === 203){
                document.getElementById('backendmsglogin').innerText = response.data.msg
            }
        }catch(err){
            console.log(err);
        }
    }
    return ( 
        <div className="signin">
            <div className="headLineDiv">
                <h2 className='headLine'>Sign In</h2>
            </div>
            
                <form className='form'>
                    <div className="feild">
                        <label htmlFor="username">Username</label>
                        <input id='username' onChange={(e)=>{setUserName(e.target.value)}} placeholder='Enter your Username ' className='inputFeild' type="email"/>
                    </div>
                    <div className="feild">
                        <label htmlFor="password">Password</label>
                        <input id="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter your password ' className='inputFeild' type="password" />
                    </div>
                    <div id="backendmsglogin"></div>
                    <div className="feild">
                        <input className='submit' onClick={handleLogin} type="submit" />
                    </div>
                </form>
                <div className="options">
                    <span className="option">Don't have an account? <Link  to='/register/signup'>Create Account</Link> </span>
                </div>
        </div>
     );
}
 
export default SignIn;