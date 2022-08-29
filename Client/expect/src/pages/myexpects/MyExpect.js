import axios from "axios";
import { useEffect, useState } from "react";
import { globalUser } from "../../Context/HomeContext";
import filteringExpects from "../matches/utilites/filteringExpects";
import Expect from '../../component/Expectes/Expect';
import './myexpect.scss'
import ExpectPhone from "../../component/Expectes/PhoneComponent/ExpectPhone";
import io from 'socket.io-client';
import { MatchCardProvider } from "../../Context/MatchCardContext";
import SmallLaoding from "../../component/loading/small.loading/smallLoading";
import Loading from "../../component/loading/big.loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Axios from "../../Axios/axios";
const socket = io.connect('http://localhost:8000');

const MyExpects = () => {
    document.getElementsByTagName("body")[0].style.overflow = "visible";
    const cookie = new Cookies();
    const navigate = useNavigate();

    const {userGlob,isDark,token,setToken,setExpected : setGlobalExpections} = globalUser();
    const [expected,setExpected] = useState([]) // this hold the full infornmtion about the game
    const [userExpections,setUserExpections] = useState([]); // this for the details about each expections like weinner and result 
    const [width,setWidth] = useState(window.innerWidth);
    const [totalPoints,setTotalPoints] = useState(0);
    const [loading,setLoading] = useState(true);
    
    window.addEventListener('resize',()=>{
             setWidth(window.innerWidth)
    })

    useEffect(()=>{
        document.title = "My Expects" ;
        localStorage.setItem("page","myexpects");
        let  isSubscribe = true;
        const userToken = token || cookie.get("token");
        console.log();
        if(!userToken)
            navigate("/register/signin");

        const fetchData = async()=>{ 
            try{
                const {data,status} = await Axios.get(`/expects/${userGlob}`,{
                    headers : {
                        token : userToken
                    }
                });
                if(status > 400)
                    return navigate('/register/signin');

                const matchesWithFlage = filteringExpects(data.matches,data.userExpections); // where we assign a flag to each expected match to be filtered again
                const filterdExpectedMatches =  matchesWithFlage.filter(val=>val.expected); // where the full details about the match
                setUserExpections(data.userExpections);
                setExpected(filterdExpectedMatches); // matches 
                setTotalPoints(data.totalPoints);
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }
       
        if (isSubscribe && userGlob) fetchData();

        return ()=> {isSubscribe = false};
    },[userGlob])




    useEffect(()=>{
        return async()=>{
            try{
                socket.on("updatingMatches",async(matches)=>{
                    console.log("repated task in soket");
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
                  
            <>
                <div className="headlineWrapper">
                    <h1 className="headline">Your Full Expects</h1>
                </div>  
                <div className="userTotalPoints">
                    <div className="text">Total Points</div>
                    <div className="totalPoints">{totalPoints} PT</div>
                </div>

           
                { 
                loading ? <SmallLaoding/> : 
                    width > 480 ?
                    (   // if condition 
                    <div className={` ${(expected.length === 0) ? 'nogrid' : 'expectsContainer'}` }> 
                                {
                                    expected.length === 0 ? 
                                    <div className="noContent">
                                        <h2>You have not expected any matches yet</h2>
                                        <h4>Nav to <Link to='/expect/matches'>Matches Page</Link> to expect</h4>
                                    </div> : 
                                    expected.map((val,index)=>{
                                        return <MatchCardProvider match = {val} childeren = {<Expect 
                                            match= {val} 
                                            key= {index}
                                            setUserExpections = {setUserExpections} 
                                            userExpect = {userExpections.find(expect=>expect.matchId === val.matchId)} 
                                                />}></MatchCardProvider>
                                                
                                            })}
                            </div> )


                                : // else condition
                            (
                                <div className={`phoneContainer ${isDark ? 'dark' : null}`}>
                                    {
                                        expected.map((val,index)=>{    
                                            return <MatchCardProvider match = {val} childeren = {<ExpectPhone key = {index} setUserExpections = {setUserExpections}  
                                            setLoading = {setLoading}
                                            userExpect = {userExpections.find(expect=>expect.matchId === val.matchId)} 
                                            match={val}/>}></MatchCardProvider>
                                        })
                                }
                                </div>
                            )
                            
                        }
                        </>
                        
            </div>
     );
}
 
export default MyExpects;