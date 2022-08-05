import { useEffect, useState } from 'react';
import MatchCard from '../../matchcards/MatchCard';
import './dontMiss.scss';
import axios from 'axios'
import SmallLaoding from '../../loading/small.loading/smallLoading';
import { globalUser } from '../../../Context/HomeContext';
import { useNavigate } from 'react-router-dom';

const DontMissList = () => {

   
    const {isDark} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const navigate = useNavigate();

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