import './myProfile.scss';
import { Table } from '@mui/material';
import { useTable } from 'react-table';
import PersonalComp from '../../component/profileComp/PersonalComp';
import ExpectsInfo from '../../component/profileComp/ExpectsInfo';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import ProfileExpects from '../../component/profileComp/ProfileExpects'
const MyProfile = () => {
const {isDark} = useContext(ThemeContext);
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