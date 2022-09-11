import { useEffect, useState } from 'react';
import MatchCard from '../../matchcards/MatchCard';
import './dontMiss.scss';
import axios from 'axios'
import SmallLaoding from '../../loading/small.loading/smallLoading';
import { globalUser } from '../../../Context/HomeContext';
import { Link } from 'react-router-dom';
import Axios from '../../../Axios/axios';
import MatchCardPhone from '../../matchcards/MatchCardPhone/MatchCardPhone';

const DontMissList = () => {

    const {isDark,userGlob} = globalUser();
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



    },[])

    return ( 
        <div className={`dontMissList ${isDark? "dark":null}`}>
            <div className= {`titleWrapper`} >
                <h1 className="title"> Don't Miss </h1>
            </div>
            {isLoading?<SmallLaoding/> : 
            (data.length === 0) ? <div className="no-content">
                <h1>No Matches</h1>
                <Link to = '/expect/matches'> Nav to matches page to see all matches</Link>
                </div> : 
            data.map((match,index)=><MatchCardPhone match={match} key={index}/>)}
        </div>
     );
}
 
export default DontMissList;