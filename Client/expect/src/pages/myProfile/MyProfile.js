import './myProfile.scss';
import PersonalComp from '../../component/profileComp/PersonalComp';
import ExpectsInfo from '../../component/profileComp/ExpectsInfo';
import { useContext,useEffect,useState } from 'react';
import ProfileExpects from '../../component/profileComp/ProfileExpects'
import { globalUser } from '../../Context/HomeContext';
import { useParams } from 'react-router-dom';
import Axios from '../../Axios/axios';
import Loading from '../../component/loading/big.loading/Loading';

const MyProfile = () => {
    document.body.style.overflow = "visible"; // to disable scrollbar
    const {userName} = useParams();
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const {isDark,userGlob} = globalUser();

    document.title = (userGlob === userName ) ? "My Profile" : `${userName.slice(0,8)} Profile`; 

    useEffect(()=>{

        let isSubscribe = true ;

        const fetchUser = async()=>{
            try{
                // it is important to note that we are reurning array from this route.
                const response = await Axios.get(`/users/profile/${userName}`);  
                setUser(response.data);
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }

        if(isSubscribe) fetchUser();

        return ()=> isSubscribe = false;

},[])
    
    return ( loading ? <Loading/> : 
              <div className={`myProfile ${isDark?'dark':null}`}>
                    <h1 className="profileTitle"><span>{userName}</span> Profile</h1>
                    <div className="informationContainer">
                    <PersonalComp user = {user}/>
                    <ExpectsInfo user = {user} />
                    </div>
                    <ProfileExpects  userName = {userName}/>
                </div>
     )
}

export default MyProfile;