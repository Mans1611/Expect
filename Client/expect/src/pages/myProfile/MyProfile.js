import './myProfile.scss';
import PersonalComp from '../../component/profileComp/PersonalComp';
import ExpectsInfo from '../../component/profileComp/ExpectsInfo';
import { useContext,useEffect,useState } from 'react';
import ProfileExpects from '../../component/profileComp/ProfileExpects'
import { globalUser } from '../../Context/HomeContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../component/loading/big.loading/Loading';

const MyProfile = () => {
    const {userName} = useParams();
    
    const [loading, setLoading] = useState(true);
    
        
    const {isDark} = globalUser();
    return ( 
              <div className={`myProfile ${isDark?'dark':null}`}>
                    <h1 className="profileTitle">Your Profile</h1>
                    <div className="informationContainer">
                    <PersonalComp userName = {userName}/>
                    <ExpectsInfo/>
                    </div>
                    <ProfileExpects/>
                </div>
     )
}

export default MyProfile;