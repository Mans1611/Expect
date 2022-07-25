import axios from "axios";
import { useEffect, useState } from "react";
import { globalUser } from "../../Context/HomeContext";
import filteringExpects from "../matches/utilites/filteringExpects";
import Expect from '../../component/Expectes/Expect';
import './myexpect.scss'
import ExpectPhone from "../../component/Expectes/PhoneComponent/ExpectPhone";


const MyExpects = () => {
    
    const {userGlob,isDark} = globalUser();
    const [expected,setExpected] = useState([]) // this hold the full infornmtion about the game
    const [userExpections,setUserExpections] = useState([]); // this for the details about each expections like weinner and result 
    const [width,setWidth] = useState(window.innerWidth);
    const [totalPoints,setTotalPoints] = useState(0);

    window.addEventListener('resize',()=>{
             setWidth(window.innerWidth)
    })

    useEffect(()=>{
        return async()=>{
            try{
                const response = await axios.get(`/expects/${userGlob}`);
                const matchesWithFlage = filteringExpects(response.data.matches,response.data.userExpections);
                const UserExpections =  matchesWithFlage.filter(val=>val.expected);
                 setUserExpections(response.data.userExpections);
                 setExpected(UserExpections);
                 setTotalPoints(response.data.totalPoints);

            }catch(err){
                console.log(err);
            }
        }
    },[])

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
                            (
                                <div className="expectsContainer"> 
                                    {expected.map((val,index)=>{
                                        return <Expect key = {index} userExpect = {userExpections[index]} match={val}/> // since the have the same length and each one meet the same in the other array
                                    })}
                                </div> )

                            
                                : // else condition
                            (
                                <div className="phoneContainer">
                                    {
                                    expected.map((val,index)=>{    
                                        return <ExpectPhone key = {index} userExpect = {userExpections[index]} match={val}/>
                                    })
                                    }
                                </div>
                            )
                            
                }
            </div>
     );
}
 
export default MyExpects;