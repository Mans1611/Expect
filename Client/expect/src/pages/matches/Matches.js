
import './match.scss';
import MathchCard from '../../component/matchcards/MatchCard';
import { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { globalUser } from '../../Context/HomeContext';
import filteringExpects from './utilites/filteringExpects';
import axios from 'axios';
import Expected from './Component/Expected/Expected';
import io from 'socket.io-client';
import SmallLaoding from '../../component/loading/small.loading/smallLoading';
import MatchCardPhone from '../../component/matchcards/MatchCardPhone/MatchCardPhone';
import RoundFilter from './Component/RoundFilter';
import { FilterState, ReduceFn } from './utilites/ReduceFn';

const socket = io.connect('http://localhost:8000'); // we connect it to the bakend server;

const Matches = () => {
    document.body.style.overflow = "visible";
    localStorage.setItem("page","matches");
    const {isDark} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [timeUp, setTimeUp] = useState(false); 
    const [width,setWidth] = useState(window.innerWidth);
    const [userExpections,setUserExpections] = useState([]); 
    const {userGlob} = globalUser();
    const [expandButton,setExpandButton] = useState("See All Matches");
    
    const date = `${new Date().getMonth() + 1},${(new Date().getDate()<10) ? `0${new Date().getDate()}`: `${new Date().getDate()}`},${new Date().getFullYear()}`
    
    useEffect(()=>{
        document.title = "Matches"
        return async () => {
            try{
                setLoading(true);
                const response = await axios.get(`/expects/${userGlob}`);
                const matchesRes = await axios.get(`/matches/?date=${date}`); // array of todays' matches
                const MatchesWithFlag = filteringExpects(matchesRes.data,response.data.userExpections);
                setData(MatchesWithFlag);
                setUserExpections(response.data.userExpections);
                setLoading(false); 
            }catch(err){
                setLoading(false);  
            }
        } 
    },[]);
    window.addEventListener('resize',()=>{
        setWidth(window.innerWidth)
})

    const [filterState,filterDispatch] = useReducer(ReduceFn,FilterState);
        

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

    const getMatchesDate = async(date)=>{
        const Date = date.split('-'); //year - month - day 

        if(Date[0] > 2020 && Date[0] < 2024){
            const searchDate = `${Date[1]},${Date[2]},${Date[0]}`;
            filterDispatch({type : "DateChange",payload : searchDate});
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
                    <h1 className="matchTitle">{filterState.title}</h1>
                    <div className="filter-container">
                       
                       <RoundFilter filterDispatch={filterDispatch} setData={setData} setLoading={setLoading}/>
                        <div className="dateContainer">
                            <label htmlFor="NavigateToThisDate">
                                <h1>Pick a Date : </h1>
                                <input onInput={(e)=>getMatchesDate(e.target.value)} type="date" name="matchDate" id="NavigateToThisDate"/>
                            </label>
                        </div>
                    </div>
                    <div className="matchCard-container">
                            {isLoading ? <SmallLaoding/> : 
                            data.length === 0 ? 
                            <div className="noContent"> 
                                <h1>No Matches</h1>
                                <p>Use above filter to get matches you want </p>
                            </div> :
                            <div className="matchCardGrid">
                                    { width > 480 ?
                                    // this will :
                                    // matchcard -> if the user did not expect this game.
                                    // expected card -> if he expected it. 
                                    data.map((value,key)=>{
                                        if(!value.expected) return <MathchCard  expected = {false} key={key} match ={value}/>;   
                                        else { return <Expected expected = {true}  key={key} match ={value} userExpect = {
                                            userExpections.find((expect)=> expect.matchId === value.matchId)
                                        }/>};
                                    }) : 
                                        // the same as above but for phone component
                                        data.map((value,index)=>{
                                            return <MatchCardPhone timeUp ={timeUp} setTimeUp = {setTimeUp} key={index} match = {value} userExpect = {
                                                userExpections.find((expect)=> expect.matchId === value.matchId)
                                            }   />
                                        })
                                    }
                            </div>
                            }
                        <div className="matchcardButton-wrapper">
                            <button onClick={(e)=>{expandMatches(e);setExpandButton(
                                expandButton === "See All Matches" ? "Just Today's" : "See All Matches" 
                            ); filterDispatch({type : "expand",payload : expandButton })}}>{expandButton}</button>
                        </div>
                    </div>
                </div>
            </div>
          
     );
}


export default Matches;