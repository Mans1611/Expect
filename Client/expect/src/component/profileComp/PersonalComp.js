import { useContext } from 'react';
import { ThemeContext } from '../../App';
import '../../pages/myProfile/myProfile.scss';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
const PersonalComp = () => {
    const {isDark} = useContext(ThemeContext);
    return ( 
        <div className="informationWrapper">
            <div className={`information ${isDark? 'dark':null}`}>
                <h2 className='InformationHeader'>Personal Information</h2>
                <div className="userInformation">
                    <h3 className="feild">UserName : <span className="value">Mans1611</span></h3>
                    <h3 className="feild"> <EmailIcon className='icons'/>email : <span id='email' className="value">mans.yousef1611@gmail.com</span></h3>
                    <h3 className="feild"><LocalPhoneIcon className='icons'/> PhoneNumber <span className="value">+97477981745</span></h3>
                    <h3 className="feild"> Verification <span className="value" id='verifiy' > Verified</span></h3>
                
                </div>
            </div>
        </div>
     );
}
 
export default PersonalComp;