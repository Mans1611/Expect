import { MailOutline } from '@mui/icons-material';
import { useEffect } from 'react';
import {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { globalUser } from '../../Context/HomeContext';
import './footer.scss';

import FeedbackNotification from '../FeedbackNotification/FeedbackNotification';

const Footer = () => {
    const {isDark} = globalUser();
    const [showFeedBackPop,setShowFeedBack] = useState(false);

    useEffect(()=>{
        const previous_feedback = localStorage.getItem('feedbackShow')

        if(previous_feedback !== "true"){
            const timeIn = setTimeout(()=>{
                setShowFeedBack(true);
            },60000)
           localStorage.setItem('feedbackShow',"true")
            const timeOut = setTimeout(()=>{
                setShowFeedBack(false);
            },70000)
        } 
       
    },[])
    

        return ( 
        <div className={`footer ${isDark? 'dark':''}`}> 
            <div className="Expect">
                <h1>E X P E C T</h1>
            </div>
            
            <div className="contentContainer">
                <div className="contactUs">
                    <Link target="_blank" to = '/whatisexpect'>What Is The Expect</Link>
                    <Link to = '/register/signin'>About Us</Link>
                    <Link to = '/register/signin'>Contact Us</Link>
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
           { showFeedBackPop 
           &&
           <FeedbackNotification setShowFeedBack = {setShowFeedBack}/>
           }
        </div>
     );
}
 
export default Footer;