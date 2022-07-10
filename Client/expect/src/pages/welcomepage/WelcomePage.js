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
               <img className='playerImage' src='https://www.footyrenders.com/render/Kevin-De-Bruyne3.png' />
                <Polygon id="firstPoly"/>
               </div>
            <div className="welcomePage second">
                <img src="https://www.footyrenders.com/render/Philippe-Coutinho-Brasil-ProRendersFutboleros-Autor.-Marcos-P%C3%A9rez.png" className='playerImage left' alt="" />
                <Polygon id='secondPoly'/>
            </div>
            
        </>
     );
}
 
export default Welcome;