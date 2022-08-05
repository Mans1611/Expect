import {Link, Outlet} from 'react-router-dom';
import ExplenationWel from '../../component/welcomeEXplenation/ExplenationWe';
import './welcome.scss';
import Polygon from './Polygon';

const Welcome = () => {
    
    return (
        <> 
            <div className="topnavbar">
                <div className="buttonscontainer">
                    <div className="buttonsWrapper">
                        <Link to='/register/signin' className="WelcomeNavbarButtons">Login</Link>
                        <Link to='/register/signup' className="WelcomeNavbarButtons blueButton">sign up</Link>
                    </div>
                </div>
            </div>

            <div className="welcomeSentenceWrapper">
               <span className="welcomeSentence"> Take Part In <span className="worldcup"> World Cup </span>With Expect </span>
            </div>
            <div className="tipsTitleWrapper">
                <span className="tipsTitle">How To Play ? </span>
            </div>

            <div className="welcomePage">
               <ExplenationWel/>
               <Polygon id="firstPoly"/>
               </div>
            <div className="welcomePage second">
                <Polygon id='secondPoly'/>
            </div>
            
        </>
     );
}
 
export default Welcome;