import './sidenavbar.scss';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import BarChartIcon from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Link} from 'react-router-dom'
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import FeedbackIcon from '@mui/icons-material/Feedback';
const cookie = new Cookies();

const SideNavbar = () => {
        useEffect(()=>{
            
            let items = document.querySelectorAll('.sidenavbaritems');

            // there is a bug in statistics it selected class dose not removed 
            for(let i = 0 ; i < items.length ; i++){ // this to remove sign out as it transfer out to the admin page
                items[i].addEventListener("click",function(){
                    try{
                        let previos = document.getElementsByClassName("selectedsidebar");
                        if(previos[0]){
                            previos[0].className = previos[0].className.replace(" selectedsidebar", "");
                            //console.log(previos[0].className);
                        }
                        this.className += ' selectedsidebar';
                        // console.log(previos );
                    }catch(err){
                        console.log(err);
                    }
                })

        }},[])
    
    return ( 
        <div className="sidenavbar">
            <Link to='/adminpage/account' className='sidenavBarLink'>
                <div id='account'  className="account sidenavbaritems ">
                    <AccountBoxIcon className='icons'/>
                    <span className="labels">Mans</span>
                </div>
            </Link>
            <div className="miditems">
                <Link to='/adminpage/dashboard' className='sidenavBarLink'>
                    <div id='dashboard' className="sidenavbaritems ">
                        <DashboardIcon className='icons'/>
                        <span className="labels">DashBoard</span>
                    </div>
                </Link>
                <Link to='/adminpage/matches' className='sidenavBarLink'>
                    <div id='matches' className="sidenavbaritems">
                        <SportsSoccerIcon className='icons'/>
                        <span className="labels">Matches</span>
                    </div>
                </Link>
                <Link to='/adminpage/statistics' className='sidenavBarLink'>
                    <div id='statistics' className="sidenavbaritems">
                        <BarChartIcon className='icons'/>
                        <span className="labels">Statistics</span>
                    </div>
                </Link>
                <Link to='/adminpage/news' className='sidenavBarLink'>
                    <div id='news' className="sidenavbaritems">
                        <NewspaperIcon className='icons'/>
                        <span className="labels">News</span>
                    </div>
                </Link>
                <Link to='/adminpage/feedback' className='sidenavBarLink'>
                    <div id='feedback' className="sidenavbaritems">
                        <FeedbackIcon className='icons'/>
                        <span className="labels">Feedback</span>
                    </div>
                </Link>
            
            
            </div>
            <Link onClick={()=>{cookie.remove("token")}} to='/adminpage/login' className='sidenavBarLink'>
                <div className="signout sidenavbaritems">
                    <ExitToAppIcon className='icons'/>
                    <span className="labels">Sign Out</span>
                </div>
            </Link>
        </div>
     );
}
 
export default SideNavbar;