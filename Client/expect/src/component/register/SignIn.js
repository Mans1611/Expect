import './signin.scss';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const SignIn = () => {
    const [mail,setMail] = useState(null);
    const [pass,setPass] = useState(null);

    const submit = (e)=>{
        console.log(mail,pass);
      e.preventDefault();
    }
    return ( 
        <div className="signin">
            <div className="headLineDiv">
                <h2 className='headLine'>Sign In</h2>
            </div>
            
                <form className='form' action="">
                    <div className="feild">
                        <label htmlFor="">Username</label>
                        <input onChange={(e)=>{setMail(e.target.value)}} placeholder='Enter your Username ' className='inputFeild' type="email"/>
                    </div>
                    <div className="feild">
                        <label htmlFor="">Password</label>
                        <input onChange={(e)=>{setPass(e.target.value)}} placeholder='Enter your password ' className='inputFeild' type="password" />
                    </div>
                    <div className="feild">
                        <input className='submit' onClick={submit} type="submit" />
                    </div>
                </form>
                <div className="options">
                    <span className="option">Don't have an account? <Link  to='/register/signup'>Create Account</Link> </span>
                </div>
        </div>
     );
}
 
export default SignIn;