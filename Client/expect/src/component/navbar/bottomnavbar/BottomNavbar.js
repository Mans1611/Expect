import '../navbar.scss';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { HomeOutlined } from '@mui/icons-material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StadiumIcon from '@mui/icons-material/Stadium';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../bottomnavbar.scss';
import { ThemeContext } from '../../../App';
import { globalUser } from '../../../Context/HomeContext';


const BottomNavbar = () => {
    const {isDark,setDark,userGlob} = globalUser();

    return ( 
        <div className={`bottomNavbar ${isDark? 'dark':'white'}`}>
            <Link to='home'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"> <HomeOutlined/> <span className="dropdownItem">Home</span></div></Link>
            <Link to='matches'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"><SportsSoccerIcon/> <span className="dropdownItem">Matches</span></div></Link>
            <Link to='myexpects'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"><StadiumIcon/> <span className="dropdownItem">MyExpects</span></div></Link>   
            <Link to='standing'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"> <AlignVerticalBottomIcon/> <span className="dropdownItem">Standing</span></div></Link>
            <div className="bottomNavbarItem dropUpBarWrapper"><AccountCircleIcon/> <span className="dropdownItem">{userGlob}</span>
                <div className="dropUpBar">
                    <Link to={`myprofile/${userGlob}`}>
                        <div  className={`dropdownItem ${isDark? 'dark':''}` }>
                            <span className="dropdownItem">MyProfile</span>
                            <AccountCircleIcon/>
                        </div> 
                    </Link>

                    <div onClick={()=>{setDark(!isDark)}} className={`dropdownItem ${isDark? 'dark':''}` }>
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