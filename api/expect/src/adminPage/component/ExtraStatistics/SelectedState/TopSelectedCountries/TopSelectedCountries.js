import React , {useState,useEffect} from 'react'
import Axios from '../../../../../Axios/axios';
import SmallLaoding from '../../../../../component/loading/small.loading/smallLoading';
import CountryAdmin_Row from './CountryAdmin_Row';
import './topSelectedCountries.scss';

const TopSelectedCountries = () => {
  const [isLoading,setLoading] = useState(true);
  const [topCountries,setTopCountries] = useState([]);
    
  
  useEffect(()=>{
        let isSubscribe = true;
        const fetchTopCountries = async()=>{
            try{
                const {data} = await Axios.get('/statistics/topcountries');
                if(isSubscribe)
                    setTopCountries(data);
               
                setLoading(false)
            }catch(err){
                console.log(err);
            }
        }
        fetchTopCountries();
        return ()=>  isSubscribe = false;
    },[])


    return (
    <div className="selectedCountries-container">
        <div className='standing-container'>
            <h1 className="title">Top Selected Countries</h1>
            <div className="standing-header row selectedCountries">
                <span className="field">No</span>
                <span className="field">Country</span>
                <span className="field">Total Fans</span>
            </div>
            {
                isLoading ? <SmallLaoding/> : 
                    topCountries.map((country,index)=><CountryAdmin_Row key={index} country={country} order = {index+1}/>)
            }   
        </div>
    </div>
  )
}

export default TopSelectedCountries