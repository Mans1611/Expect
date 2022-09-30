import '../navbar.scss';
import '../bottomnavbar.scss';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { HomeOutlined } from '@mui/icons-material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StadiumIcon from '@mui/icons-material/Stadium';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from '../../../App';
import { globalUser } from '../../../Context/HomeContext';
import GroupsIcon from '@mui/icons-material/Groups';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const BottomNavbar = () => {
    const {isDark,setDark,userGlob} = globalUser();
    
    
    const toggleDropUpBar = (e)=>{
        // const drobBar = document.getElementById('dropUpBar');
        // if(drobBar.style.display === 'block')
        //     return drobBar.style.display = 'none';
        
        // drobBar.style.display = 'block';
    }

    const toggleDark = ()=>{
        setDark(!isDark);
        localStorage.setItem('isDark', isDark ? 'false' : 'true');
    }
    
    return ( 
        <div className={`bottomNavbar ${isDark? 'dark':'white'}`}>
            <Link to='/home'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"> <HomeOutlined/> <span className="dropdownItem">Home</span></div></Link>
            <Link to='/expect/matches'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"><SportsSoccerIcon/> <span className="dropdownItem">Matches</span></div></Link>
            <Link to='/myexpects'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"><StadiumIcon/> <span className="dropdownItem">MyExpects</span></div></Link>   
            <Link to='/team/myteam'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"><GroupsIcon/> <span className="dropdownItem">Team</span></div></Link>   
            <Link to='/states'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"> <AlignVerticalBottomIcon/> <span className="dropdownItem">States</span></div></Link>
            <div className="bottomNavbarItem dropUpBarWrapper"><MenuIcon/> <span className="dropdownItem">More</span>
                <div id='dropUpBar' className="dropUpBar">
                    
                    
                    <Link to='/register/signup'>
                        <div  className={`dropdownItem ${isDark? 'dark':''}` }>
                            <span className="dropdownItem">Sign Out</span>
                            <ExitToAppIcon/>
                        </div> 
                    </Link>
                    
                    <Link to={`/myprofile/${userGlob}`}>
                        <div  className={`dropdownItem ${isDark? 'dark':''}` }>
                            <span className="dropdownItem">My Profile</span>
                            <AccountCircleIcon/>
                        </div> 
                    </Link>
                    

                    <div onClick={toggleDark} className={`dropdownItem ${isDark? 'dark':''}` }>
                        <span className="dropdownItem">Dark Mode</span>
                        <div className="circleContainer">
                            <LightModeIcon color="warning" className='darkModeIcons'/>
                            <DarkModeIcon className='darkModeIcons'/>
                            <div className={`circle ${isDark?' right':''}`}></div>
                        </div>
                    </div> 
                   
                </div>
            </div>  
        </div>
    
     );
}
 
export default BottomNavbar;