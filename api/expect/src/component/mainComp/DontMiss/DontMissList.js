import { useEffect, useState } from 'react';
import './dontMiss.scss';
import SmallLaoding from '../../loading/small.loading/smallLoading';
import { globalUser } from '../../../Context/HomeContext';
import { Link } from 'react-router-dom';
import Axios from '../../../Axios/axios';
import MatchCardPhone from '../../matchcards/MatchCardPhone/MatchCardPhone';

const DontMissList = () => {

    const {isDark,userGlob,auth} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);

    useEffect(()=>{
        let isSubscribe = true;

        const fetchMatches =  async()=>{
            try{
                const response = await Axios.get(`/matches/dontmissmatch?userName=${userGlob}`); // so the match will not be en 
                if(isSubscribe)
                    setData(response.data.filteredMatches);
                
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }
        fetchMatches();
        
        ()=> isSubscribe = false;



    },[userGlob])

    return ( 
        <div className={`dontMissList ${isDark? "dark":null}`}>
            <div className= {`titleWrapper`} >
                <h1 className="title"> Don't Miss </h1>
            </div>
            {isLoading?<SmallLaoding/> : 
            (data.length === 0) ? <div className="no-content">
                <h1>No Matches</h1>
                <Link to = '/matches'> Nav to matches page to see all matches</Link>
                </div> : 
            data.map((match,index)=><MatchCardPhone dontMiss = {true} noExpect = {true} match={match} key={index}/>)}
        </div>
     );
}
 
export default DontMissList;