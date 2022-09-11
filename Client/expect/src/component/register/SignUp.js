
import './signup.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useContext, useEffect, useRef,useState } from 'react';
import { ArrowBackIos } from '@mui/icons-material';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import SmallLaoding from '../loading/small.loading/smallLoading';
import Cookies from 'universal-cookie';
import {moveToFirst,moveToSecond} from './utilites/Moving.js';
import { globalUser, userContext } from '../../Context/HomeContext';
const SignUp = () => {
    document.getElementsByTagName('body')[0].style.overflow = 'visible';
    document.title = "Create An Account";

    const cookie = new Cookies();
    const [countriesOption, setCountries] = useState([]);
    const [userName,setUserName] = useState(null);
    const [phone,setPhone] = useState(null);
    const [mail,setMail] = useState(null);
    const [pass,setPass] = useState(null);
    const [rePass,setRepass] = useState(null);
    const [country,setCountry] = useState(null);    
    const [loading,setLoading] = useState(true); 
    const [loadingPost,setLoadingPost] = useState(false);
    const [errMsg,setErrorMSg] = useState(false);
    

    const navigate = useNavigate();
    const store = globalUser();
 
    useEffect(()=>{

       
        return async()=>{
            try{
            const response = await axios.get('/country/countries');
            setCountries(response.data);
            setLoading(false);
        }
        catch(err){
            console.log(err);
        }
        
    }},[])

    const fields = document.getElementsByClassName('inputFeild');
    for(let i = 0 ; i<fields.length;i++){
        // if(fields[i].tagName === "SELECT")
        //     continue;
        fields[i].addEventListener('focus',(e)=>{
            e.target.nextSibling.innerHTML='';
            e.target.style.border ="" 

        })
    }
    
    

    const submit = async (e)=>{
        e.preventDefault();
        // long validation id conditions
            if(userName == '' || userName==null){
                document.getElementById(`userNamemsg`).innerText = " *Username is required";
                document.getElementById(`userNamemsg`).previousElementSibling.style.border ="2px solid red" 
                moveToFirst();
                return 0 ; 

            }
            if(mail == '' || mail==null){
                document.getElementById(`mailmsg`).innerText = " *mail is required";
                document.getElementById(`mailmsg`).previousElementSibling.style.border ="2px solid red" 
                moveToFirst();
                return 0 ; 

            }
            if(pass == '' || pass==null){
                document.getElementById(`passmsg`).innerText = " *Password is required";
                document.getElementById(`passmsg`).previousElementSibling.style.border ="2px solid red" 
                moveToFirst();
                return 0 ; 
            }
            if(userName == '' || userName==null){
                document.getElementById(`repassmsg`).innerText = " *Renter Your password";
                document.getElementById(`repassmsg`).previousElementSibling.style.border ="2px solid red" 
                moveToFirst();
                return 0 ; 

            }
            if(pass!==rePass){
                document.getElementById(`passmsg`).innerText = " *Password must matches";
                document.getElementById(`repassmsg`).innerText = " *Password must matches";
                document.getElementById(`passmsg`).previousElementSibling.style.border ="2px solid red" 
                document.getElementById(`repassmsg`).previousElementSibling.style.border ="2px solid red" 
                moveToFirst();
                return 0 ;
            }
            if(pass&& pass !== '' &&pass.length < 7 ){
                document.getElementById(`passmsg`).innerText = " *Password length must be 8";
                document.getElementById(`passmsg`).previousElementSibling.style.border ="2px solid red" 
                moveToFirst();
                return 0 ; 
            }
            if(country==null || country ==''){
                document.getElementById(`countrymsg`).innerText = " *Select your support country";
                document.getElementById(`countrymsg`).previousElementSibling.style.border ="2px solid red" 
                return 0 ; 
            }

            // long validation regular expression from stackoverflow
            const mailreg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
            if(!mail.match(mailreg)){
                document.getElementById(`mailmsg`).innerText = " *mail is not valid";
                document.getElementById(`mailmsg`).previousElementSibling.style.border ="2px solid red" 
                moveToFirst();
                return 0;
            }
        
            try{
                setLoadingPost(true);
                setUserName(userName.replace(/ /g,''));
                setMail(mail.replace(/ /g,''));

                if(phone!==null){
                    setPhone(phone.replace(/ /g,''));
                    if(phone!=='')
                        setPhone('+974'+phone);
                }
                const user = {userName,email:mail,password:pass,userCountry:country,phoneNumber:phone}  ;
                const response = await axios.post('/register/signup',user);
                if(response.status === 201){
                    setLoadingPost(false);
                    store.setUserGlob(userName);
                    store.setAuth(true);
                    store.setToken(response.data.token);
                    navigate('/expect/home');
                    let token = ''
                    for(let letter of response.headers.token){
                        token += letter.indexOf()
                    }
                    cookie.set('token',response.headers.token,{
                        maxAge : 60*60*8 // the token is valid for 8 hours 
                    })


                }


                else if(response.status === 203){
                    setLoadingPost(false);
                    setErrorMSg(true);
                    setTimeout(()=>{
                        document.getElementById('backendMsg').innerText = response.data.msg;
                    },0)
                }
            }catch(err){
                console.log(err);
            }
        
        }

    return ( 
        <div className="signup">
             <div className="headLineDiv">
                <h2 className='headLine'>Createing Account</h2>
            </div>
                <form id='formSlider' className='formSignup' >
                    <div className="firstForm">
                        <div className="feild">
                            <label htmlFor="">Username</label>
                            <input onChange={(e)=>{setUserName(e.target.value)}} placeholder='Enter your Username ' className='inputFeild' type="text" />
                            <span className='warning' id="userNamemsg"></span>
                        </div>
                        <div className="feild">
                            <label htmlFor="">Email</label>
                            <input onChange={(e)=>{setMail(e.target.value)}} placeholder='Enter your email ' className='inputFeild' type="email" />
                            <span className='warning' id="mailmsg"></span>
                        </div>
                        <div className="feild">
                            <label htmlFor="">Password</label>
                            <input onChange={(e)=>{setPass(e.target.value)}} placeholder='Enter your password ' className='inputFeild' type="password" />
                            <span id='passmsg' className="passmsg warning"></span>
                        </div>
                        <div className="feild">
                            <label htmlFor="">Re-Password</label>
                            <input placeholder='Re-enter your password' onChange={(e)=>setRepass(e.target.value)} className='inputFeild' type="password" />
                            <span id='repassmsg' className="passwordmsg warning"></span>
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
                            <input onChange={(e)=>{setPhone(e.target.value)}} maxLength={8}   placeholder='Enter your PhoneNumber ' className='inputFeild' type="phonenumber"/>
                            <span  className='warning' id="phonemsg"></span>
                        </div>
                        <div className="feild">
                            <label htmlFor="country">Country </label>
                            {
                                loading? <SmallLaoding/>:
                                <select id='country'  onChange={(e)=>{setCountry(e.target.value)}} className='selectCountry inputFeild'>
                                    <option className='defaultSelection' defaultChecked  value=''>Select Your fan country</option>
                                    {countriesOption.map((country,id)=>{
                                        const countrylogo = { backgroundImage : `url(${country.logo})` }; 
                                        return <option style= {countrylogo} value={country.countryName} key={id}>{country.countryName}</option> 
                                    })}
                                </select>
                            }
                            <span id='countrymsg' className='warning'></span>
                        </div>
                        <div className="secondFormNext">
                            <button onClick={moveToFirst} className="prevButton">
                                <ArrowBackIos/>
                                Back
                            </button>
                            <button type='submit'  onClick={submit} className="nextButton">
                                {loadingPost? "Loading" : "Submit"}
                            </button>
                        </div>
                        {errMsg && <div id='backendMsg'></div>}
                    </div>
                </form>
        </div>
     );
}

export default SignUp;