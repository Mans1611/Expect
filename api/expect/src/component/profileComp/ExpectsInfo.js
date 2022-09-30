import '../../pages/myProfile/myProfile.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

const ExpectsInfo = ({user}) => {
    const {isDark} = useContext(ThemeContext);
   
    return ( 
        <div className="informationWrapper expects">
            <div className={`information ${isDark? 'dark': ''}`}>
            <div className="informationHeader-Wrapper">
                <h2 className="InformationHeader">Expect Info</h2> 
            </div>
                <div className="userInformation">
                    <h3 className="feild">Standing : <span className="value">{user[0].userStanding}</span></h3>
                    <h3 className="feild">TotalPoints : <span className="value">{user[0].userPoints}</span></h3>
                    <h3 className="feild">TotalExpects : <span className="value">{user[1]}</span></h3>
                    <h3 className="feild">Team : <span className="value">{user[0].team ? user[0].team.teamName : "-"}</span></h3>
                    <div className='imageWrapper'>
                       <h3 className="userCountry">Country : <span className="value">{user[0].countries.countryName}</span></h3>
                        <img src={user[0].countries.logo} alt={user[0].countries.logo} />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ExpectsInfo;