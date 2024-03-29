import './signin.scss';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { globalUser } from '../../Context/HomeContext';
import Cookies from 'universal-cookie';
import Axios from '../../Axios/axios';
import { deviceType } from './utilites/detectDevice';

const SignIn = () => {
    document.title = "Sign in";
    const location = useLocation();
    const redirect = location.state?.path || '/expect/home';
    const [userName,setUserName] = useState(null);
    const [password,setPassword] = useState(null);
    const [errMsg,setErrorMSg] = useState(false);
    const navigate = useNavigate();
    const store = globalUser();
    const cookie = new Cookies();
    const inputs = document.getElementsByClassName('inputFeild');


    for(let input of inputs){
        input.addEventListener('focus',()=>{
            setErrorMSg(false)
        })
    }

   


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
            const device = deviceType();
            const response = await Axios.post('/register/login',{userName,password,device});
            if(response.status === 200){
                cookie.set('token',response.data.token,{
                    maxAge : 60 * 60 * 3
                });
                cookie.set('expect_id',response.data.session_id,{
                    maxAge : 60 * 60 * 3
                });
               

                store.setUserGlob(userName)
                store.setAuth(true);
                store.setToken(response.data.token);
                store.setUser(response.data.user);
                
                const audio = new Audio()
                audio.controls = true;
                audio.src = 'http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a';
                audio.autoplay = true;
                audio.style.display = 'none';
                document.getElementById('root').appendChild(audio);
                const page = localStorage.getItem("page") || 'home'  ;

                navigate(`/${page}`);

                setTimeout(()=>{
                    document.getElementById('root').removeChild(audio);
                },800)
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
                    <button className='submit'  onClick={handleLogin} >Login</button>
                </div>
            </form>
                <div className="options">
                    <span className="option">Don't have an account? <Link  to='/register/signup'>Create Account</Link> </span>
                </div>
        </div>
     );
}
 
export default SignIn;