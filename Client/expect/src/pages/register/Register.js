import { useEffect, useState } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import SignIn from '../../component/register/SignIn';
import './register.scss';
import SignUp from '../../component/register/SignUp';

const Register = () => {
    let paths = window.location.href.split('/');
    const [path,setPath] = useState(paths.find(element => element ==='signin' || element ==='signin' ));    
    
    useEffect(()=>{
        paths = window.location.href.split('/');
        setPath(paths.find(element => element ==='signin' || element ==='signin' ));
        console.log(window.location.href);
    },[window.location.href]);
    
    
    return ( 
        <div className="register">
            <div className="registerImgContainer">
                <h1 className="registerTitle">Expect</h1>
                <img src="https://cdn.mos.cms.futurecdn.net/kjTczgrLk4EDPmASJEnfZB.jpg" className='mascot' alt="" />
            </div>
            
            <div className="formContainer">
                <h1 className="registerHeadLine">
                Take Part In <span className='worldCup'>World Cup </span>With Expect 
                </h1>
                <div className="divForm">
                   {/* i defined it here as routs and in the app too  and it works */}
                   <Routes>  
                        <Route path='signin' element={<SignIn/>}/>
                        <Route path='signup' element={<SignUp/>}/>
                   </Routes>
                </div>
            
            </div>
        </div>
     );
}
 
export default Register;