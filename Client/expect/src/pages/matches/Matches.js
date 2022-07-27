
import MathchCard from '../../component/matchcards/MatchCard';
import { useState, useEffect, useContext } from 'react';
import Loading from '../../component/loading/big.loading/Loading';
import './match.scss';
import NotFound from '../../component/NotFound/NotFound';
import { globalUser } from '../../Context/HomeContext';
import filteringExpects from './utilites/filteringExpects';
import axios from 'axios';
import Expected from './Component/Expected/Expected';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import SmallLaoding from '../../component/loading/small.loading/smallLoading';

const socket = io.connect('http://localhost:8000'); // we connect it to the bakend server;

let expandButton = 'See All Matches';

const setExpandButton = (value) =>{
    expandButton = value;
}

const Matches = () => {

    

    const {isDark} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [timeUp, setTimeUp] = useState(false); 
    const cookie = new Cookies();
    const navigate = useNavigate();
    const {userGlob} = globalUser();

const date = `${new Date().getMonth() + 1},${new Date().getDate()},${new Date().getFullYear()}`
useEffect(()=>{
    return async () => { 

        try{
            const token = cookie.get("token");
            if(!token)
                navigate('/register/signin');
            else{ 
                    const response = await axios.get(`/expects/${userGlob}`);
                    const matchesRes = await axios.get(`/matches/?date=${date}`); // array of todays' matches
                    const MatchesWithFlag = filteringExpects(matchesRes.data,response.data.userExpections);
                    setData(MatchesWithFlag);
                    setLoading(false);
            }
        }catch(err){
            setLoading(false);  
        }
    } 
},[]);

    useEffect(()=>{
        socket.on("updatingMatches",async(matches)=>{
            setLoading(true)
            if(expandButton === "Just Todays' Matches"){
                    const Response = await axios.get(`/expects/${userGlob}`);
                    const MatchesWithFlag = filteringExpects(matches,Response.data.userExpections);
                    setData(MatchesWithFlag);
                }
            else if(expandButton === "See All Matches") {
                    const Response = await axios.get(`/expects/${userGlob}`);
                    const matchesRes = await axios.get(`/matches/?date=${date}`); // array of todays' matches
                    const MatchesWithFlag = filteringExpects(matchesRes.data,Response.data.userExpections);
                    setData(MatchesWithFlag);
                }
                setLoading(false);
        })

    },[socket])


    const expandMatches = async(e)=>{
        e.preventDefault();
        setLoading(true);
        if(expandButton === 'See All Matches'){
            const Response = await axios.get(`/expects/${userGlob}`);
            const MatchesWithFlag = filteringExpects(Response.data.matches,Response.data.userExpections);
            setData(MatchesWithFlag);
            setExpandButton("Just Todays' Matches");  
            
        }
        else if(expandButton === `Just Todays' Matches`){
            const response = await axios.get(`/expects/${userGlob}`);
            const matchesRes = await axios.get(`/matches/?date=${date}`); // array of todays' matches
            const MatchesWithFlag = filteringExpects(matchesRes.data,response.data.userExpections);
            setData(MatchesWithFlag);
            setExpandButton("See All Matches");  
        }
        setLoading(false);
            
    }
    return ( 
           
                <div className= {`match  ${isDark?'dark':''}` } >
                    <div className="matchWrapper">
                        <h1 className="matchTitle">Today Matches</h1>
                        <div className="matchCard-container">
                                {isLoading ? <SmallLaoding/> : 
                                <div className="matchCardGrid">
                                        {
                                        data.map((value,key)=>{
                                            if(!value.expected) return <MathchCard timeUp={timeUp} setTimeUp={setTimeUp} dark={isDark} key={key} match ={value}/>;   
                                            else { return <Expected  key={key} match ={value}/>};
                                            
                                        })
                                        }
                                </div>
                                }
                            <div className="matchcardButton-wrapper">
                                <button onClick={expandMatches}>{expandButton}</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
          
     );
}


export default Matches;