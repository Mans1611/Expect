import Footer from '../../component/footer/Footer';
import DontMissList from '../../component/mainComp/DontMiss/DontMissList';
import MainNews from '../../component/mainComp/mainNews/MainNews';
import './home.scss';
import { useContext,useState } from 'react';
import { ThemeContext } from '../../App';

const Home = () => {
    const {isDark}  = useContext(ThemeContext);
    return ( 
            <div className={`home ${isDark?'dark':null}`}>
                <div className="pageContainer">
                    <MainNews/>
                    <DontMissList/>
                </div>
                <Footer/>
            </div>
        
     );
}
 
export default Home;