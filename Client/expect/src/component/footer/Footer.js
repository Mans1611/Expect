import { MailOutline } from '@mui/icons-material';
import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import './footer.scss';

const Footer = () => {
    const {isDark} = useContext(ThemeContext);
        return ( 
        <div className={`footer ${isDark?'dark':null}`}>
            <div className="Expect">
                <h1>E X P E C T</h1>
            </div>
            
            <div className="contentContainer">
                <div className="contactUs">
                    <Link to = '/home'>What Is The Expect</Link>
                    <Link to = '/home'>About Us</Link>
                    <Link to = '/home'>Contact Us</Link>
                    <div className="iconsContainer">
                        <Link to='/'>
                            <img className='imgicons' src="https://pbs.twimg.com/profile_images/1508518003184349187/1KQYoqPY_400x400.png" alt="" srcset="" />
                        </Link>
                        <Link to='/'>
                            <img className='imgicons' src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/800px-Gmail_icon_%282020%29.svg.png" alt="" srcset="" />
                        </Link>
                    </div>

                </div>
                <div className="feedBackContainer">
                    <Link to = '/home'>FeedBack</Link>
                </div>
            <div>
                <Link to='/'>Help & Support</Link>
            </div>
            </div>

            <div className="bottomFooter">
                <h3>
                    <span>&copy;</span>All Rights Conserved To Expect 2022
                </h3>
            </div>
           
        </div>
     );
}
 
export default Footer;