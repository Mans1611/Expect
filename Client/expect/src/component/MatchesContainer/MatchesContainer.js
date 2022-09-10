import React, { useEffect, useState } from 'react'
import Axios from '../../Axios/axios';
import SmallLaoding from '../loading/small.loading/smallLoading';
import MathchCard from '../matchcards/MatchCard';
import MatchCardPhone from '../matchcards/MatchCardPhone/MatchCardPhone';
import './matchesContainer.scss';



const MatchesContainer = () => {


    const [isLoading,setLoading] = useState(true);
    const [matches,setMatches] = useState([]);
    const [width,setWidth] = useState(window.innerWidth);
    const [timeUp, setTimeUp] = useState(false); 
    const date = `${new Date().getMonth() + 1},${(new Date().getDate()<10) ? `0${new Date().getDate()}`: `${new Date().getDate()}`},${new Date().getFullYear()}`

    useEffect(()=>{
    let isSubscribe = true ; 
        const fetchMatches = async()=>{
            const {data} = await Axios.get(`/matches/?date=${date}`);
            setMatches(data);
            setLoading(false);
        }
        if(isSubscribe) fetchMatches();

        return () => isSubscribe = false;
    })
    useEffect(()=>{
        setWidth(window.innerWidth);
    },[window.innerWidth])
  return (
    <div className="matchCard-container">
                        <div className="headline-matchContaine">
                            <h1>Today Matches</h1>
                        </div>
                            {isLoading ? <SmallLaoding/> : 
                            matches.length === 0 ? 
                            <div className="noContent welcomepage"> 
                                <h1>No Matches</h1>
                            </div> :
                            <div className="matchCardGrid">
                                    { width > 480 ?
                                    // this will :
                                    // matchcard -> if the user did not expect this game.
                                    // expected card -> if he expected it. 
                                    matches.map((value,key)=>  <MathchCard  expected = {false} key={key} match ={value}/> ) 
                                    : 
                                        // the same as above but for phone component
                                    matches.map((value,index)=> <MatchCardPhone timeUp ={timeUp} setTimeUp = {setTimeUp} key={index} match = {value} />)
                                    }
                            </div>
                            } 
                    </div>
  )
}

export default MatchesContainer