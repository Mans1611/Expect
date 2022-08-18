
import MathchCard from '../../component/matchcards/MatchCard';
import { useState, useEffect, useContext } from 'react';
import Loading from '../../component/loading/big.loading/Loading';
import './match.scss';
import NotFound from '../../component/NotFound/NotFound';
import { globalUser } from '../../Context/HomeContext';
import filteringExpects from './utilites/filteringExpects';
import axios from 'axios';
import Expected from './Component/Expected/Expected';
import io from 'socket.io-client';
import SmallLaoding from '../../component/loading/small.loading/smallLoading';
import MatchCardPhone from '../../component/matchcards/MatchCardPhone/MatchCardPhone';

const socket = io.connect('http://localhost:8000'); // we connect it to the bakend server;

const Matches = () => {

    const {isDark} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [timeUp, setTimeUp] = useState(false); 
    const [width,setWidth] = useState(window.innerWidth);
    const {userGlob} = globalUser();
    const [expandButton,setExpandButton] = useState('See All Matches');

const date = `${new Date().getMonth() + 1},${(new Date().getDate()<10) ? `0${new Date().getDate()}`: `${new Date().getDate()}`},${new Date().getFullYear()}`

useEffect(()=>{
    return async () => {
        try{
            const response = await axios.get(`/expects/${userGlob}`);
            const matchesRes = await axios.get(`/matches/?date=${date}`); // array of todays' matches
            const MatchesWithFlag = filteringExpects(matchesRes.data,response.data.userExpections);
            setData(MatchesWithFlag);
            setLoading(false);
            
        }catch(err){
            setLoading(false);  
        }
    } 
},[]);


    window.addEventListener('resize',()=>{
        setWidth(window.innerWidth)
})



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
        console.log("socet change");
    },[socket])

    const getMatchesDate = async(date)=>{
        const Date = date.split('-'); //year - month - day 
        if(Date[0] > 2020 && Date[0] < 2024){
            const searchDate = `${Date[1]},${Date[2]},${Date[0]}`;
            try{
                const Response = await axios.get(`/expects/${userGlob}`);
                const {data:dateMatches} = await axios.get(`/matches/?date=${searchDate}`);
                const MatchesWithFlag = filteringExpects(dateMatches,Response.data.userExpections);
                setData(MatchesWithFlag); 
            }catch(err){
                console.log(err);
            }
        }
    }

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
                    <div className="dateContainer">
                        <label htmlFor="NavigateToThisDate">
                            <h1>Pick a Date : </h1>
                            <input onInput={(e)=>getMatchesDate(e.target.value)} type="date" name="matchDate" id="NavigateToThisDate"/>
                        </label>
                    </div>
                    <div className="matchCard-container">
                            {isLoading ? <SmallLaoding/> : 
                            <div className="matchCardGrid">
                                    { width > 480 ?
                                    data.map((value,key)=>{
                                        if(!value.expected) return <MathchCard timeUp={timeUp} setTimeUp={setTimeUp} dark={isDark} key={key} match ={value}/>;   
                                        else { return <Expected  key={key} match ={value}/>};
                                    }) : 
                                        data.map((value,index)=>{
                                            return <MatchCardPhone timeUp ={timeUp} setTimeUp = {setTimeUp} key={index} match = {value}   />
                                        })
                                    }
                            </div>
                            }
                        <div className="matchcardButton-wrapper">
                            <button onClick={(e)=>{expandMatches(e);setExpandButton(
                                expandButton === "See All Matches" ? "Just Today's" : "See All Matches" 
                            )}}>{expandButton}</button>
                        </div>
                    </div>
                </div>
            </div>
          
     );
}


export default Matches;