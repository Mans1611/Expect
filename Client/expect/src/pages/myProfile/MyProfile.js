import './myProfile.scss';
import { Table } from '@mui/material';
import { useTable } from 'react-table';
import PersonalComp from '../../component/profileComp/PersonalComp';
import ExpectsInfo from '../../component/profileComp/ExpectsInfo';
import { useContext } from 'react';
import ProfileExpects from '../../component/profileComp/ProfileExpects'
import { globalUser } from '../../Context/HomeContext';
const MyProfile = () => {
    const {isDark} = globalUser();
    return ( 
        <div className={`myProfile ${isDark?'dark':null}`}>
            <h1 className="profileTitle">Your Profile</h1>
            <div className="informationContainer">
                <PersonalComp/>
                <ExpectsInfo/>
            </div>
            <ProfileExpects/>
        </div>
     );
}
 
export default MyProfile;