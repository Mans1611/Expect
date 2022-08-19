import {Link, Outlet} from 'react-router-dom';
import ExplenationWel from '../../component/welcomeEXplenation/ExplenationWe';
import './welcome.scss';
import Polygon from './Polygon';
import TopNavbar from './TopNavbar';
import MainCom from './MainCom';

const Welcome = () => {
    
    return (
        <> 
            <TopNavbar/>
            <MainCom />
        </>
     );
}
 
export default Welcome;