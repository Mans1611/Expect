import {useContext} from 'react';
import { ThemeContext } from '../../App';
import './footer.scss';

const Footer = () => {
    const {isDark} = useContext(ThemeContext);
        return ( 
        <div className={`footer ${isDark?'dark':null}`}>
            Footers
        </div>
     );
}
 
export default Footer;