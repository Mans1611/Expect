import '../../pages/myProfile/myProfile.scss';
import { useContext } from 'react';
import { ThemeContext } from '../../App';

const ExpectsInfo = () => {
    const {isDark} = useContext(ThemeContext);
   
    return ( 
        <div className="informationWrapper">
            <div className={`information ${isDark? 'dark': ''}`}>
                <h2 className="InformationHeader">Expect Info</h2> 
                <div className="userInformation">
                    <h3 className="feild">Standing : <span className="value">#35</span></h3>
                    <h3 className="feild">TotalPoints : <span className="value">96 PTS</span></h3>
                    <h3 className="feild">TotalExpects : <span className="value">8</span></h3>
                    <div className='imageWrapper'>
                       <h3 className="userCountry">Country : <span className="value">KSA</span></h3>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/1200px-Flag_of_Saudi_Arabia.svg.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ExpectsInfo;