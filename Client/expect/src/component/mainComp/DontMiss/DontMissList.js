import { useEffect, useState } from 'react';
import MatchCard from '../../matchcards/MatchCard';
import './dontMiss.scss';
import axios from 'axios'
import SmallLaoding from '../../loading/small.loading/smallLoading';
import { globalUser } from '../../../Context/HomeContext';

const DontMissList = () => {
    const {isDark} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);
    useEffect(()=>{
        return async()=>{
            try{
                const {data} = await axios.get('/matches/match/?fullTime=false'); // so the match will not be en
                setData(data)
                console.log(data);
                setLoading(false);
                return data[0];
            }catch(err){
                console.log(err);
            }
        }

    },[])

    return ( 
        <div className={`dontMissList ${isDark? "dark":""}`}>
            <div className= {`titleWrapper ${isDark? "dark":""}`} >
                <h1 className="title">
                    Don't Miss
                </h1>
            </div>
            {isLoading?<SmallLaoding/> : data.map((match,index)=><MatchCard match={match} key={index}/>)}
        </div>
     );
}
 
export default DontMissList;