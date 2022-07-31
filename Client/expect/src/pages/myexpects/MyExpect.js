import axios from "axios";
import { useEffect, useState } from "react";
import { globalUser } from "../../Context/HomeContext";
import filteringExpects from "../matches/utilites/filteringExpects";
import Expect from '../../component/Expectes/Expect';
import './myexpect.scss'
import ExpectPhone from "../../component/Expectes/PhoneComponent/ExpectPhone";
import Expected from "../matches/Component/Expected/Expected";
import io from 'socket.io-client';
import { MatchCardProvider } from "../../Context/MatchCardContext";

const socket = io.connect('http://localhost:8000');

const MyExpects = () => {
    
    const {userGlob,isDark} = globalUser();
    const [expected,setExpected] = useState([]) // this hold the full infornmtion about the game
    const [userExpections,setUserExpections] = useState([]); // this for the details about each expections like weinner and result 
    const [width,setWidth] = useState(window.innerWidth);
    const [totalPoints,setTotalPoints] = useState(0);
    const [Loading,setLoading] = useState(true);
    window.addEventListener('resize',()=>{
             setWidth(window.innerWidth)
    })

    useEffect(()=>{
        return async()=>{
            try{

                const response = await axios.get(`/expects/${userGlob}`);
                const matchesWithFlage = filteringExpects(response.data.matches,response.data.userExpections); // where we assign a flag to each expected match to be filtered again
                const filterdExpectedMatches =  matchesWithFlage.filter(val=>val.expected); // where the full details about the match
                setUserExpections(response.data.userExpections);
                setExpected(filterdExpectedMatches); // matches 
                setTotalPoints(response.data.totalPoints);
                setLoading(false);

            }catch(err){
                console.log(err);
            }
        }
    },[])

    useEffect(()=>{
        return async()=>{
            try{
                socket.on("updatingMatches",async(matches)=>{
                    const response = await axios.get(`/expects/${userGlob}`);
                    const matchesWithFlage = filteringExpects(matches,response.data.userExpections); // where we assign a flag to each expected match to be filtered again
                    const filterdExpectedMatches =  matchesWithFlage.filter(val=>val.expected); // where the full details about the match
                    setUserExpections(response.data.userExpections);
                    setExpected(filterdExpectedMatches); // matches afterFiltering , so iam garunted that all matches in this variable  is expected by this user
                    setTotalPoints(response.data.totalPoints);

                })

            }catch(err){
                console.log(err);
            }
        }
    },[socket])

    return ( 
        <div className={`myexpects ${isDark? 'dark':''}`}>
            <div className="headlineWrapper">
                <h1 className="headline">Your Full Expects</h1>
            </div>  
            <div className="userTotalPoints">
                <div className="text">Total Points</div>
                <div className="totalPoints">{totalPoints} PT</div>
            </div>

           
                {
                    (width > 580) ?
                        (   // if condition 
                            <div className="expectsContainer"> 
                                {
                                    expected.map((val,index)=>{
                                        return <MatchCardProvider match = {val} childeren = {<Expect 
                                                match= {val} 
                                                setUserExpections = {setUserExpections} 
                                                userExpect = {userExpections.find(expect=>expect.matchId === val.matchId)} 
                                                />}></MatchCardProvider>
                                
                                })}
                            </div> )

                            
                                : // else condition
                            (
                                <div className="phoneContainer">
                                    {
                                    expected.map((val,index)=>{    
                                        return <MatchCardProvider match = {val} childeren = {<ExpectPhone key = {index} userExpect = {userExpections[index]} match={val}/>}></MatchCardProvider>
                                    })
                                    }
                                </div>
                            )
                            
                }
            </div>
     );
}
 
export default MyExpects;