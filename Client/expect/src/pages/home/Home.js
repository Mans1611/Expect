import DontMissList from '../../component/mainComp/DontMiss/DontMissList';
import MainNews from '../../component/mainComp/mainNews/MainNews';
import './home.scss';

import { globalUser, userContext } from '../../Context/HomeContext';
import HomeStanding from '../../component/HomeStanding/HomeStanding';
import PlayersToExpect from '../../component/PlayersToExpect/PlayersToExpect';

const Home = () => {
    
    const {isDark,userGlob} = globalUser();
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