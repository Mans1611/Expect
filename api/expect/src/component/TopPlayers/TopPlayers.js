import './topPlayers.scss';

import React, { useEffect,useState } from 'react'
import axios from 'axios';
import PlayerCard from '../popmatchcard/playercard/PlayerCard';
import SmallLaoding from '../loading/small.loading/smallLoading';
import { globalUser } from '../../Context/HomeContext';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Axios from '../../Axios/axios';

const TopPlayers = () => {
    const [topPlayers,setTopPlayers] = useState([]);
    const [loading,setLoading] = useState(true);
    const {isDark} = globalUser();
    useEffect(()=>{
        let isSubscribe = true;

        const fetchTopPlayers = async()=>{
            try{
                const {data} = await Axios.get('/statistics/topplayers');
                if(isSubscribe)
                    setTopPlayers(data);

                setLoading(false);
            }catch(err){
                console.log(err);
            }

        }
        fetchTopPlayers();
        return ()=> isSubscribe = false;
    },[])

    


  return (
        <div className={`TopPlayers ${isDark? 'dark' : ''}`}>
            <div className="topPlayersTitle">
                Top Players
            </div>
            {
                loading ? <SmallLaoding/> :
                <div className="playersContainer">
                {
                    topPlayers.map((player,index)=> <PlayerCard player = {player} key = {index} />) 
                }
                
            </div>
            }
            {/* <div className="ShowMoreWrapper">
                <button className="showMore">Show More </button>
            </div> */}
        </div>
  )
}

export default TopPlayers