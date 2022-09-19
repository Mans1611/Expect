import React, { useEffect, useState } from 'react'
import Axios from '../../Axios/axios';
import { globalUser } from '../../Context/HomeContext';
import SmallLaoding from '../loading/small.loading/smallLoading';
import './playerEachMatchPoints.scss';

const PlayerEachMatchPoints = ({player,setTotalPoints}) => {
    const {isDark,token} = globalUser();
    const [isLoading,setLoading] = useState(true);
    const [details,setDetails] = useState([]);
    
    useEffect(()=>{
        let isSubscribe = true;
        const fetchPlayerDetails = async()=>{
            
            try{
                const {data} = await Axios.get(`/player/playerDetails/${player.countryName}/${player.index}`)
                
                if(isSubscribe)
                    setDetails(data);
                setLoading(false)
            }catch(err){
                console.log(err);
            }
        }
        fetchPlayerDetails();

    },[])
    if(isLoading)
        return <SmallLaoding/>


    return (
        <div className= {`playerMatchPoints-container ${isDark ? 'dark' : ''}`} >
            <div className="table-header-wrapper row">
                <div className="item">Opponent</div>
                <div className="item">Match Points</div>
            </div>
            {
                details.map((detail,index)=>(
                <div key={index} className="detail-player row">
                    <div className="item flex-img">
                        <h3>{detail.opponent}</h3>
                        <img src={detail.logo}/>
                    </div>
                    <h2 className="item">{detail.playerPoints}</h2>
                </div>

                ))
            }
        </div>
    )
}

export default PlayerEachMatchPoints
