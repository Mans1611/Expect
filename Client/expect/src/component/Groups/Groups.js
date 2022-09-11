
import React, { useEffect , useState,useCallback } from 'react'
import Axios from '../../Axios/axios'
import CountryStanding from '../CountryStanding/CountryStanding';
import './groups.scss';
import Slideshow from './utilis/slideshow';
import SmallLaoding from '../loading/small.loading/smallLoading';
import GroupNav from './GroupNav';

const Groups = () => {
    const [groups,setGroups] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        let isSubscribe = true;

        const fetchGroups = async()=>{
            const {data} = await Axios.get('/country/groupsTable');
            if(isSubscribe)
            setGroups(data);
            setLoading(false)
        }
        
        fetchGroups();
        ()=> {
            isSubscribe = false;
            
        }
    },[])
    
   

    

    
    


    if(loading)
        return <SmallLaoding/> ;
    
    
    
    return (
        <>
            <div className='groups-container'>
                <div className="header">
                    <h1>Groups</h1>
                </div>
                <div className="content-container">

                {
                     
            
                    groups.map((group,index)=> <CountryStanding 
                    groupName={group[0].group}
                    key={index}  
                    groupStanding = {group}
                    />)
                                    
                     
                    
                    
                }
                </div>
            </div>
        </>
  )
}

export default Groups