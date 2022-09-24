import '../TopPlayers/topPlayers.scss' ;
import React , {useState, useEffect} from 'react'
import { globalUser } from '../../Context/HomeContext'
import Axios from '../../Axios/axios';
import SmallLoading from '../loading/small.loading/smallLoading';

// this component is for top players in the country not over all.
import PlayerCard from '../popmatchcard/playercard/PlayerCard'

const TopPlayersCountry = ({countryName}) => {
    const {isDark} = globalUser();

    const [topPlayers,setTopPlayers] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        let isSubscribe = true;
        const fetchTopPlayers = async()=>{
            try{
                const {data} = await Axios.get(`/country/topPlayers/${countryName}`);
                if(isSubscribe) 
                    setTopPlayers(data.topPlayers);
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }

        fetchTopPlayers();
        ()=> isSubscribe = false;
    },[countryName])

    useEffect(()=>{
        const playerCards = document.querySelectorAll('.palyerCard');
        const observer = new IntersectionObserver(([entry])=>{
           if(entry.isIntersecting)
                entry.target.classList.add('showplayerCard');
        },{
            threshold : 0.5
        })


        if(window.innerWidth ){
           playerCards.forEach((player,index,arr)=>{
                observer.observe(arr[index]);
                
           })
        }

    },[topPlayers,countryName])

  return (
    <div className="topPlayersContainer">
        <div className={`TopPlayers ${isDark? 'dark' : ''}`}>
                <div className="topPlayersTitle">Top Players</div>
                    <div className="playersContainer">
                    {
                        loading ? <SmallLoading/> : 
                        topPlayers.map((player,index)=> <PlayerCard player = {player} key = {index} />) 
                    }
                    
                </div>
                
            
            </div>
        </div>
  )
}

export default TopPlayersCountry