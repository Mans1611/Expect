import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './navbar.scss';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BottomNavbar from './bottomnavbar/BottomNavbar';
import { globalUser } from '../../Context/HomeContext';
import Cookies from 'universal-cookie';

const Navbar = () => {
    
   

    const [width , setWidth] = useState(window.innerWidth);
    const [scale, setScale] = useState(((width<680)? true : false));
    let items = document.getElementsByClassName('navbarLink');
    const navbarItems = ["Home", "Matches", "MyExpects", "Team/myteam" , "States"];
    const {isDark,setDark} = globalUser();
    const cookie = new Cookies();
   
    let location = useLocation().pathname.split("/")[2].split('/')[0]; 
    let item = document.getElementById(location)
    
    if(item)
        item.classList.add("selected");
    
    useEffect(()=>{
        item = document.getElementById(location)
        if(item)
            item.classList.add("selected");
    },[isDark])
    
    useEffect(()=>{
        document.getElementById('navbar').addEventListener('reload',()=>{
            console.log("mansour");
        })
        for(let i = 0 ; i<items.length;i++){
            items[i].addEventListener('click',function(){
                let previousSelected = document.getElementsByClassName('selected');
                console.log(previousSelected[0]);
                if(previousSelected[0]){
                    previousSelected[0].className = previousSelected[0].className.replace(' selected','');
                }
                this.className += ' selected';
            })
        } 
        setScale(((width<680)? true : false))
    } 
    ,[])

    window.addEventListener('resize',()=>{
        setWidth(window.innerWidth);
        setScale(((width<680)? true : false))
    }) 

    const store = globalUser();
    
    const handleLogOut = ()=>{
        store.setAuth(false);
        store.setUserGlob(false);
        cookie.remove('token');
    }

    return ( 
        <>
        <>
        <div id='navbar'  className={`navbar ${isDark? 'dark': null}`}>
            <div className="navbarContainer">
                <div className="navbarLeft">
                    <Link to="/" className={`navbarLink ${isDark? 'dark': ""}`}><h1>Expect</h1></Link>
                </div>
                <div className="navbarRight">
                    {!scale && <>
                    {   navbarItems.map((item,index)=>{ // to reduce the code lines 
                        return <Link key={index} id = {`${item.toLowerCase()}`} to = {`${item.toLowerCase()}`} className={`navbarLink`}><span className="navbarRightItem" key={index}>{item.split('/')[0]}</span></Link>    
                    })
                    }
                    </>
                    }
                    
                    <div className="navbarMenu">
                       <div className="imgContainer">
                       
                            <span className="username">{store.userGlob?.split(" ").splice(0,12)[0]}</span>
                       
                       </div>
                       <div className='navbarDropdown'>
                            <Link to={`myprofile/${store.userGlob}`}  className={`navbarLink ${isDark? 'dark': ""}`}><div className="dropdownItem"><span className="dropdownItem">My Profile</span></div></Link>
                            <div onClick={
                                ()=>{
                                localStorage.setItem('isDark',!isDark);
                                
                                setDark(!isDark);
                            }
                                } className={`dropdownItem ${isDark? 'dark':''}` }>
                                <span className="dropdownItem">Dark Mode</span>
                                <div className="circleContainer">
                                    <LightModeIcon color="warning" className='darkModeIcons'/>
                                    <DarkModeIcon className='darkModeIcons'/>
                                    <div className={`circle ${isDark?' right':''}`}></div>
                                </div>
                            </div>
                            <Link to='/register/signup' onClick={handleLogOut}  className={`navbarLink ${isDark? 'dark': ""}`}> <div className="dropdownItem"> <span className="dropdownItem">Log out</span></div></Link>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        {scale && <BottomNavbar/>}
        </>
        <Outlet/>
        </>
     );
}


export default Navbar;
