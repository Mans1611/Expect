import { useEffect, useState } from 'react';
import MatchCard from '../../matchcards/MatchCard';
import './dontMiss.scss';
import axios from 'axios'
import SmallLaoding from '../../loading/small.loading/smallLoading';
import { globalUser } from '../../../Context/HomeContext';
import { Link } from 'react-router-dom';

const DontMissList = () => {

    const {isDark} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);

    useEffect(()=>{
        return async()=>{
            try{
                const response = await axios.get('/matches/match/?fullTime=false'); // so the match will not be en 
                setData(response.data);
                
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }

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
            data.map((match,index)=><MatchCard match={match} key={index}/>)}
        </div>
     );
}
 
export default DontMissList;