import { useEffect, useState } from 'react';
import MathchCard from '../../matchcards/MatchCard';
import './dontMiss.scss';
import axios from 'axios'
import SmallLaoding from '../../loading/small.loading/smallLoading';
import { globalUser } from '../../../Context/HomeContext';

const DontMissList = () => {
    const {isDark} = globalUser();
    const [data,setData] = useState(null);
    const [isLoading,setLoading] = useState(true);
    useEffect(()=>{
        return async()=>{
            try{
                const {data} = await axios.get('/matches/getmatches');
                setData(data)
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
            {isLoading?<SmallLaoding/> : <MathchCard match= {data[0]} />}
        </div>
     );
}
 
export default DontMissList;