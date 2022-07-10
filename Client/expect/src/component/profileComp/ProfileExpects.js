import '../../pages/myProfile/myProfile.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../App';
import PostMatchCard from '../postMatchCard/PostMatchCard';
const ProfileExpects = () => {
    const {isDark} = useContext(ThemeContext);

    return ( 
        <div className={`userExpectContainer ${isDark? 'dark' : ''}`}>
                <h1 className="profileTitle">Your Expects</h1>
                <div className="expects">
                    <PostMatchCard/>
                </div>
        </div>
     );
}
 
export default ProfileExpects;  