import DontMissList from '../../component/mainComp/DontMiss/DontMissList';
import MainNews from '../../component/mainComp/mainNews/MainNews';
import './home.scss';

import { globalUser, userContext } from '../../Context/HomeContext';
import HomeStanding from '../../component/HomeStanding/HomeStanding';
import PlayersToExpect from '../../component/PlayersToExpect/PlayersToExpect';

const Home = () => {
    document.title = "Home";
    localStorage.setItem("page","home");
    document.body.style.overflow = 'visible';
    
    const {isDark,userGlob,token} = globalUser();
   return ( 
            <div className={`home ${isDark?'dark':''}`}>
                <div className="pageContainer">
                    <div className="fisrtColumn column">
                        <MainNews/>
                        <PlayersToExpect/>
                    </div>
                    <div className="secondColumn column">
                        <DontMissList/>
                        <HomeStanding/>
                    </div>
                </div>
            </div>
        
     );
}
 
export default Home;