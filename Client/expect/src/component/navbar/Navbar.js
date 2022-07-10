import { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import './navbar.scss';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BottomNavbar from './bottomnavbar/BottomNavbar';
import { ThemeContext } from '../../App';

const Navbar = (props) => {
    const [width , setWidth] = useState(window.innerWidth);
    const [scale, setScale] = useState(((width<680)? true : false));
    let items = document.getElementsByClassName('navbarLink');
    const navbarItems = ["Home" , "Matches","MyExpects", "Standing"];
    const {isDark,setDark} = useContext(ThemeContext);
    
    useEffect(()=>{
        for(let i = 0 ; i<items.length;i++){
            items[i].addEventListener('click',function(){
                let previousSelected = document.getElementsByClassName('selected');
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
    
    return ( 
        <>
        <>
        <div  className={`navbar ${isDark? 'dark': null}`}>
            <div className="navbarContainer">
                <div className="navbarLeft">
                    <Link to="/" className={`navbarLink ${isDark? 'dark': ""}`}><h1>Expect</h1></Link>
                </div>
                <div className="navbarRight">
                    {!scale && <>
                    {   navbarItems.map((item,index)=>{ // to reduce the code lines 
                        return <Link key={index} to = {`${item.toLowerCase()}`} className={`navbarLink ${isDark? 'dark': ""}`}><span className="navbarRightItem" key={index}>{item}</span></Link>    
                    })

                    }
                        </>
                    }
                    <div className="navbarMenu">
                       <div className="imgContainer">
                        <span className="username">Mans1611</span>
                        <img className='navbarProfileImg' src="https://cdn.dribbble.com/users/1040983/screenshots/5630845/media/e95768b82810699dfd54512ff570954a.png?compress=1&resize=400x300&vertical=top" />
                       </div>
                       <div className='navbarDropdown'>
                            <Link to='myprofile'  className={`navbarLink ${isDark? 'dark': ""}`}><div className="dropdownItem"><span className="dropdownItem">My Profile</span></div></Link>
                            <div onClick={()=>{setDark(!isDark)}} className={`dropdownItem ${isDark? 'dark':''}` }>
                                <span className="dropdownItem">Dark Mode</span>
                                <div className="circleContainer">
                                    <LightModeIcon color="warning" className='darkModeIcons'/>
                                    <DarkModeIcon className='darkModeIcons'/>
                                    <div className={`circle ${isDark?' right':''}`}></div>
                                </div>
                            </div>
                            <Link to='/'  className={`navbarLink ${isDark? 'dark': ""}`}> <div className="dropdownItem"> <span className="dropdownItem">Log out</span></div></Link>
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
