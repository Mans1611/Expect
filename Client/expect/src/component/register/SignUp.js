
import './signup.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef,useState } from 'react';
import { ArrowBackIos } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const countries = ["Qatrar","Senegal","France","England","KSA"]
    const formSlider = useRef();
    const [showMsg,setShow] = useState(false);


    const [username,setUsername] = useState(null);
    const [phone,setPhone] = useState(null);
    const [mail,setMail] = useState(null);
    const [pass,setPass] = useState(null);
    const [rePass,setRepass] = useState(null);
    const [country,setCountry] = useState(countries[0]);    
    const [loading,setLoading] = useState(false); 
    const moveToSecond = (e)=>{
        e.preventDefault();
        const width = getComputedStyle(document.getElementsByClassName("divForm")[0]).width; // incase responsive pages so the width will be variable not static 
        console.log(width);
        formSlider.current.style.transform = `translateX(-${width})`;
    }
    const moveToFirst = (e)=>{
        e.preventDefault();
        formSlider.current.style.transform = "translateX(0px)"

    }

    const submit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        if(pass===rePass){
            const user = {username,phonenumber:phone,email:mail,pw1:pass,country};
            console.table(user);
            axios.post('http://127.0.0.1:8000/register/signup',user).then((res)=>{
                    setLoading(false);
                    setShow(true);
                    console.log(res);
                }).catch((err)=>{
                    console.log(err);
                });
        
        }
        
    }



    return ( 
        <div className="signup">
             <div className="headLineDiv">
                <h2 className='headLine'>Createing Account</h2>
            </div>
                <form ref={formSlider} className='formSignup' action="">
                    <div className="firstForm">
                        <div className="feild">
                            <label htmlFor="">Username</label>
                            <input onChange={(e)=>{setUsername(e.target.value)}} placeholder='Enter your Username ' className='inputFeild' type="text"/>
                        </div>
                        <div className="feild">
                            <label htmlFor="">Email</label>
                            <input onChange={(e)=>{setMail(e.target.value)}} placeholder='Enter your email ' className='inputFeild' type="email"/>
                        </div>
                        <div className="feild">
                            <label htmlFor="">Password</label>
                            <input onChange={(e)=>{setPass(e.target.value)}} placeholder='Enter your password ' className='inputFeild' type="password"/>
                        </div>
                        <div className="feild">
                            <label htmlFor="">Re-Password</label>
                            <input placeholder='Re-enter your password' onChange={(e)=>setRepass(e.target.value)} className='inputFeild' type="password"/>
                        </div>
                        <div className="firstFormNext">
                            <button onClick={moveToSecond} className="nextButton">
                                Next
                                <ArrowForwardIosIcon/>
                            </button>
                        </div>
                        <div className="options">
                            <span className="option">You have already account? <Link  to='/register/signin'>Signin</Link> </span>
                        </div>
                    </div>
                    <div className="secondForm">
                        <div className="feild">
                            <label htmlFor="">PhoneNumber <span className="notRequired">(Not Required) </span></label>
                            <input onChange={(e)=>{setPhone(e.target.value)}} placeholder='Enter your PhoneNumber ' className='inputFeild' type="phonenumber"/>
                        </div>
                        <div className="feild">
                            <label htmlFor="">Country </label>
                            <select onChange={(e)=>{setCountry(e.target.value)}} className='selectCountry inputFeild'>
                                {countries.map((country,id)=>{
                                    return <option value={country.toLowerCase()} key={id}>{country}</option> 
                                })}
                            </select>
                        </div>
                        <div className="secondFormNext">
                            <button onClick={moveToFirst} className="prevButton">
                                <ArrowBackIos/>
                                Back
                            </button>
                            <button  onClick={submit} className="nextButton">
                                {(loading)? "Loading" : "Submit"}
                            </button>
                            {/* {showMsg && <div className='msg'>
                                    {msg}
                                </div>} */}
                        </div>
                    </div>
                </form>
        </div>
     );
}
 
export default SignUp;