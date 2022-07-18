import Footer from '../../component/footer/Footer';
import DontMissList from '../../component/mainComp/DontMiss/DontMissList';
import MainNews from '../../component/mainComp/mainNews/MainNews';
import './home.scss';
import { globalUser, userContext } from '../../Context/HomeContext';
import HomeStanding from '../../component/HomeStanding/HomeStanding';

const Home = () => {
    const {isDark,setDark} = globalUser();
    
    
    return ( 
            <div className={`home ${isDark?'dark':null}`}>
                <div className="pageContainer">
                    <MainNews/>
                    <DontMissList/>
                    <div></div>
                    <HomeStanding/>
                </div>
            </div>
        
     );
}
 
export default Home;