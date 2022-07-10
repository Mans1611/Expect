import '../navbar.scss';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { HomeOutlined } from '@mui/icons-material';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StadiumIcon from '@mui/icons-material/Stadium';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import '../bottomnavbar.scss';
import {useContext} from 'react';
import { ThemeContext } from '../../../App';


const BottomNavbar = () => {
    const {isDark,setDark} = useContext(ThemeContext);

    return ( 
        <div className={`bottomNavbar ${isDark? 'dark':'white'}`}>
            <Link to='home'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"> <HomeOutlined/> <span className="dropdownItem">Home</span></div></Link>
            <Link to='matches'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"><SportsSoccerIcon/> <span className="dropdownItem">Matches</span></div></Link>
            <Link to='standing'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"> <AlignVerticalBottomIcon/> <span className="dropdownItem">Standing</span></div></Link>
            <Link to='myexpects'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItem"><StadiumIcon/> <span className="dropdownItem">MyExpects</span></div></Link>   
            <div className="bottomNavbarItem dropUpBarWrapper"><MenuIcon/> <span className="dropdownItem">More</span>
                <div className="dropUpBar">
                    <Link to='/myprofile'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItemDropUP"><SportsSoccerIcon/> <span className="dropdownItem">My Profile</span></div></Link>
                    <div onClick={()=>{setDark(!isDark)}} className={`dropdownItem ${isDark? 'dark':''}` }>
                        <span className="dropdownItem">Dark Mode</span>
                        <div className="circleContainer">
                            <LightModeIcon color="warning" className='darkModeIcons'/>
                            <DarkModeIcon className='darkModeIcons'/>
                            <div className={`circle ${isDark?' right':''}`}></div>
                        </div>
                        </div>
                    <Link to='/myprofile'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItemDropUP"><SportsSoccerIcon/> <span className="dropdownItem">Matches</span></div></Link>
                    <Link to='/myprofile'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItemDropUP"><SportsSoccerIcon/> <span className="dropdownItem">Matches</span></div></Link>
                    <Link to='/myprofile'  className={`bottomNavbarLink navbarLink ${isDark? 'dark': ""}`}><div className="bottomNavbarItemDropUP"><SportsSoccerIcon/> <span className="dropdownItem">Matches</span></div></Link>
                </div>
            </div>  
        </div>
    
     );
}
 
export default BottomNavbar;