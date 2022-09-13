import '../../pages/myProfile/myProfile.scss';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { globalUser } from '../../Context/HomeContext';
import { useEffect,useState } from 'react';
import SmallLaoding from '../loading/small.loading/smallLoading';
import axios from 'axios';
import UpdatePersonalInformation from '../UpdatePersoonalInformation/UpdatePersonalInformation';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useParams } from 'react-router-dom';
const PersonalComp = ({user}) => {    
    const {isDark,userGlob} = globalUser();
    const [showUpdateInformation,setUPI] = useState(false);
    const {userName} = useParams();
    document.body.style.overflow = "visible";
    return (
        <>
       
    <div className="informationWrapper">
        <div className={`information ${isDark? 'dark':null}`}>
            <div className="informationHeader-Wrapper">
                <h2 className='InformationHeader'>Personal Information</h2>
                <div className="editWrapper">
                    <span className='editIcon' onClick={()=>setUPI(true)}>
                        {(userGlob === userName ) && <><span>Edit</span> <EditIcon/></>}
                    </span> 

                </div>
            </div>

            <div className="userInformation">
                <h3 className="feild"><AccountCircleIcon className='icons'/>UserName : <span className="value">{user[0].userName}</span></h3>
                <h3 className="feild"> <EmailIcon className='icons'/>email : <span id='email' className="value">{user[0].email}</span></h3>
                {(userGlob === userName ) && <h3 className="feild"><LocalPhoneIcon className='icons'/> PhoneNumber <span className="value">{user[0].phoneNumber}</span></h3>}
                {(userGlob === userName ) && <h3 className="feild"><VerifiedUserIcon className = 'icons' /> Verification <span className="value" id='verifiy' > Verified</span></h3>}
                {showUpdateInformation && <UpdatePersonalInformation setShow={setUPI} PI = {user[0]} />}
            </div>
        </div>
    </div>
    
        </>
     );
}
 
export default PersonalComp;