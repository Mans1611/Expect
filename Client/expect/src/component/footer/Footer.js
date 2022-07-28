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
                <img className='cupIcon' src="https://cdn-icons.flaticon.com/png/512/3099/premium/3099038.png?token=exp=1659016363~hmac=05fb2dfd71a7a59d7c4d97fd8c361314" alt="" srcset="" />
                <h1>E X P E C T</h1>
                <img className='cupIcon' src="https://cdn-icons.flaticon.com/png/512/3099/premium/3099038.png?token=exp=1659016363~hmac=05fb2dfd71a7a59d7c4d97fd8c361314" alt="" srcset="" />
            </div>
            
            <div className="contentContainer">
                <div className="contactUs">
                    <Link to = '/home'>What Is The Expect</Link>
                    <Link to = '/home'>About Us</Link>
                    <Link to = '/home'>Contact Us</Link>
                    <div className="iconsContainer">
                        <Link to='/'>
                            <img className='imgicons' src="https://cdn-icons-png.flaticon.com/512/1383/1383262.png" alt="" srcset="" />
                        </Link>
                        <Link to='/'>
                            <img className='imgicons' src="https://cdn-icons.flaticon.com/png/512/2875/premium/2875394.png?token=exp=1659014607~hmac=526dc724762201fddee5852f8cd03655" alt="" srcset="" />
                        </Link>
                    </div>

                </div>
                <div className="feedBackContainer">
                    <h2>Send Your FeedBack</h2>
                    <textarea>mans</textarea>
                    <button>Submit</button>
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