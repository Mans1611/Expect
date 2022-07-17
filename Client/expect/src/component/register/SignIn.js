import './signin.scss';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { globalUser } from '../../Context/HomeContext';
import Cookies from 'universal-cookie';
const SignIn = () => {
    const [userName,setUserName] = useState(null);
    const [password,setPassword] = useState(null);
    const [errMsg,setErrorMSg] = useState(false);
    const navigate = useNavigate();
    const store = globalUser();
    const cookie = new Cookies();

    const inputs = document.getElementsByClassName('inputFeild')
    for(let input of inputs){
        input.addEventListener('focus',()=>{
            setErrorMSg(false)
        })
    }
    useEffect(()=>{
        return async()=>{
            const token = cookie.get("token")
            if(token){
                navigate('/expect/home')
                store.setAuth(true);
                const {data} = await axios.get(`/register/verifySession/${token}`);
                store.setUserGlob(data.payload.userName);
                cookie.set("token",token,{
                    maxAge : 60*60*8
                })
            }

        }
    },[])

    const handleLogin = async(e)=>{
        e.preventDefault();

        if(!userName || !password || password == ''){
            setErrorMSg(true);
            
            // to make it async and the div of #backendMsg would be avaliable thin
            setTimeout(()=>{
                document.getElementById('backendmsglogin').innerText = 'Enter both Username and Password'
            })
            return 0;
        }
       
        try{
            const response = await axios.post('/register/login',{userName,password});
            if(response.status === 200){
                cookie.set('token',response.data.token,{
                    maxAge:30
                });
                store.setUserGlob(userName)
                store.setAuth(true)
                navigate('/expect/home');
            }
            else if(response.status === 203){
                setErrorMSg(true);
                setTimeout(()=>{
                    document.getElementById('backendmsglogin').innerText = response.data.msg

                })
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
                    {errMsg && <div id="backendmsglogin"></div>}
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