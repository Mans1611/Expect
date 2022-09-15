import { MailOutline } from '@mui/icons-material';
import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { globalUser } from '../../Context/HomeContext';
import './footer.scss';

const Footer = () => {
    const {isDark} = globalUser();

        return ( 
        <div className={`footer ${isDark? 'dark':''}`}>
            <div className="Expect">
                <h1>E X P E C T</h1>
            </div>
            
            <div className="contentContainer">
                <div className="contactUs">
                    <Link target="_blank" to = '/whatisexpect'>What Is The Expect</Link>
                    <Link to = '/'>About Us</Link>
                    <Link to = '/'>Contact Us</Link>
                </div>
                <div className="feedBackContainer">
                    <Link to = '/feedback'>FeedBack</Link>
                </div>
            <div className = "feedBackContainer">
                <Link to='/support'>Help & Support</Link>
            </div>
            </div>
            
            <div className="bottomFooter">
                
            </div>
            <div className="bottomFooter fake">
                
            </div>
           
        </div>
     );
}
 
export default Footer;