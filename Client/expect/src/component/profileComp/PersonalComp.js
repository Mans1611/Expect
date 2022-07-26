import '../../pages/myProfile/myProfile.scss';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { globalUser } from '../../Context/HomeContext';
import { useEffect,useState } from 'react';
import Loading from '../loading/big.loading/Loading';
import SmallLaoding from '../loading/small.loading/smallLoading';
import axios from 'axios';
const PersonalComp = ({userName}) => {
    
    const {isDark} = globalUser();
    const [loading,setLoading] = useState(true);
    const [PI,setPI] = useState(null);
    useEffect(()=>{
        return async()=>{
            try{
                const response = await axios.get(`/users/profile/${userName}`);
                setPI(response.data[0]);
                console.log(PI);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
    }
},[])

    return (
        <>
        {
            loading ? <SmallLaoding/> : 
        <div className="informationWrapper">
            <div className={`information ${isDark? 'dark':null}`}>
                <h2 className='InformationHeader'>Personal Information</h2>
                <div className="userInformation">
                    <h3 className="feild">UserName : <span className="value">{PI.userName}</span></h3>
                    <h3 className="feild"> <EmailIcon className='icons'/>email : <span id='email' className="value">{PI.email}</span></h3>
                    <h3 className="feild"><LocalPhoneIcon className='icons'/> PhoneNumber <span className="value">{PI.phoneNumber}</span></h3>
                    <h3 className="feild"> Verification <span className="value" id='verifiy' > Verified</span></h3>
                
                </div>
            </div>
        </div>
        }
        </>
     );
}
 
export default PersonalComp;