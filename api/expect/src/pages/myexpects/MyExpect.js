import './myexpect.scss';
import '../matches/match.scss';
import { useEffect, useMemo, useReducer, useState } from "react";
import { globalUser } from "../../Context/HomeContext";
import filteringExpects from "../matches/utilites/filteringExpects";
import Expect from '../../component/Expectes/Expect';
import ExpectPhone from "../../component/Expectes/PhoneComponent/ExpectPhone";
import io from 'socket.io-client';
import { MatchCardProvider } from "../../Context/MatchCardContext";
import SmallLaoding from "../../component/loading/small.loading/smallLoading";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Axios from "../../Axios/axios";
import GoldenPlayerCard from '../../component/GoldenPlayerCard/GoldenPlayerCard';
import PostMatchCard from '../../component/postMatchCard/PostMatchCard';
import { FilterState, ReduceFn } from '../matches/utilites/ReduceFn';
import RoundExpectFilter from './RoundExpectFilter';



//https://expect-app.herokuapp.com/
const socket = io.connect('https://expect-app.herokuapp.com/' ,{
    withCredentials: true,
        extraHeaders: {
    "my-custom-header": "abcd"
  }
});


// const socket = io.connect('http://localhost:8000',{
//     withCredentials: true,
//         extraHeaders: {
//             "my-custom-header": "abcd"
//   }
// }); // we connect it to the bakend server;


const MyExpects = () => {
    document.body.style.overflow = "visible";
    const cookie = new Cookies();
    const navigate = useNavigate();
    const {userGlob,isDark,token,user,goldenPlayer,expectedMatches} = globalUser();
    
    const [expected,setExpected] = useState([]) // this hold the full infornmtion about the game
    const [userExpections,setUserExpections] = useState([]); // this for the details about each expections like weinner and result 
    const [width,setWidth] = useState(window.innerWidth);
    const [loading,setLoading] = useState(true);
    const [goldenTotalPoints,setGoldenTotalPoints] = useState(0);
    const [expectationPoints,setExpectationsPoints] = useState(0);
    const [totalPoints,setTotalPoints] = useState(0);



    window.addEventListener('resize',()=>{
             setWidth(window.innerWidth)
    })
    document.title = "My Expects" ;
    localStorage.setItem("page","myexpects");

    useEffect(()=>{
        let  isSubscribe = true;
        const userToken = token || cookie.get("token");

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

                // const matchesWithFlage = filteringExpects(data.matches,data.userExpections); // where we assign a flag to each expected match to be filtered again
                // const filterdExpectedMatches =  matchesWithFlage.filter(val=>val.expected); // where the full details about the match
              
                if(isSubscribe){
                    setUserExpections(data.userExpections);
                    let reverseorder = data.filterMatches.reverse();
                    setExpected(reverseorder); 
                    setTotalPoints(data.totalPoints);
                    console.log(data);  
                    
                }
                setLoading(false);
            }catch(err){
                console.log(err);
            }
        }
       if(userGlob)
            fetchData();

        return ()=> {isSubscribe = false};
    },[userGlob,expectedMatches]);


    //  useMemo(()=>{
    //     if(goldenPlayer){

    //         if(userGlob && ! (goldenPlayer.old_Player) && goldenPlayer.player)
    //             return setTotalPoints( goldenPlayer.player.doublePoints  + expectationPoints );
            
    //         else if(userGlob && (goldenPlayer.old_Player) )
    //             return setTotalPoints( goldenPlayer.totalPoints  + expectationPoints );
    //     }

    // },[goldenPlayer,userGlob])




    useEffect(()=>{
        let isSubscribe = true;
         const fetchSocket =  async()=>{
            try{
                socket.on("updatingMatches",async(matches)=>{
                    try{
                        const response = await Axios.get(`/expects/${userGlob}`);
                        const matchesWithFlage = filteringExpects(matches,response.data.userExpections); // where we assign a flag to each expected match to be filtered again
                        const filterdExpectedMatches =  matchesWithFlage.filter(val=>val.expected); // where the full details about the match
                        if(isSubscribe){
                            setUserExpections(response.data.userExpections);
                            setExpected(filterdExpectedMatches.reverse()); // matches afterFiltering , so iam garunted that all matches in this variable  is expected by this user
                            setTotalPoints(response.data.totalPoints);
                            setGoldenTotalPoints(response.data.goldenPlayerPoints)
                        }

                    }catch(err){
                        console.log(err);
                    }
                })

            }catch(err){
                console.log(err);
            }
        }
        fetchSocket();
        return ()=> isSubscribe = false;

    },[socket])
   
    const [filterState,filterDispatch] = useReducer(ReduceFn,FilterState);
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


                {/* <div className="filter-container">
                       <RoundExpectFilter  filterDispatch={filterDispatch} setUserExpections = {setUserExpections} setTotalPoints = {setTotalPoints}   setExpected={setExpected} setLoading={setLoading}/>
                        <div className="dateContainer">
                            <label htmlFor="NavigateToThisDate">
                                <h1>Pick a Date : </h1>
                                    <input  onInput={(e)=>getMatchesDate(e.target.value)} type="date" name="matchDate" id="NavigateToThisDate"/>
                            </label>
                        </div>
                </div> */}



           
                    {
                        width > 480 ?
                    (   // if condition 
                    <div className="flex-wrapper">

                        <div className={` ${(expected.length === 0) ? 'nogrid' : 'expectsContainer'}` }> 
                            { loading ? <SmallLaoding/> : 
                                
                                    expected.length === 0 ? 
                                    <div className="noContent">
                                        <h2>You have not expected any matches yet</h2>
                                        <h4>Nav to <Link to='/expect/matches'>Matches Page</Link> to expect</h4>
                                    </div> 
                                    : 
                                    expected.map((val,index)=>{
                                        return <PostMatchCard 
                                            match = {val} 
                                            key= {index}
                                            setUserExpections = {setUserExpections} 
                                            userExpect = {userExpections.find(expect=>expect.matchId === val.matchId)} 
                                            />}
                                        )
                                        }
                                    </div>
                            <GoldenPlayerCard setGoldenPlayerPoints={setGoldenTotalPoints}  />
                    </div> 
                    )


                                : // else condition
                            (
                                <div className="flex-wrapper">

                                <div className="fakeContainer">
                                    
                                    <div className={`phoneContainer ${isDark ? 'dark' : ''}`}>
                                    {
                                        loading ? <SmallLaoding/> :
                                        expected.length === 0 ?  
                                        <div className="noContent">
                                            <h2>You have not expected any matches yet</h2>
                                            <h4>Nav to <Link to='/expect/matches'>Matches Page</Link> to expect</h4>
                                        </div> 
                                    :
                                        expected.map((val,index)=>{    
                                            return <MatchCardProvider match = {val} childeren = {<ExpectPhone key = {index} setUserExpections = {setUserExpections}  
                                            setLoading = {setLoading}
                                            userExpect = {userExpections.find(expect=>expect.matchId === val.matchId)} 
                                            match={val}/>}></MatchCardProvider>
                                        })
                                    }
                                    </div>
                                    <GoldenPlayerCard setGoldenPlayerPoints = {setGoldenTotalPoints} />
                                    </div>
                                    
                                </div>
                            )
                            
                        }
                        </>
                        
            </div>
     );
}
 
export default MyExpects;