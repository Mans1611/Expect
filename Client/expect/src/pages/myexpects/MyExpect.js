import axios from "axios";
import { useEffect, useState } from "react";
import { globalUser } from "../../Context/HomeContext";
import Expected from "../matches/Component/Expected/Expected";
import filteringExpects from "../matches/utilites/filteringExpects";
import Expect from "./Expectes/Expect";
import './myexpect.scss'
const MyExpects = () => {
    const {userGlob,isDark} = globalUser();
    const [expected,setExpected] = useState([]) // this hold the full infornmtion about the game
    const [userExpections,setUserExpections] = useState([]); // this for the details about each expections like weinner and result 
    
    useEffect(()=>{

        return async()=>{
            try{
                const {data:Expected} = await axios.get(`/expects/${userGlob}`);
                const {data:matches} = await axios.get('/matches/getmatches');

                const commonMatches = filteringExpects(matches,Expected);
                
                console.log(commonMatches);
                
                const expetedFullMatches = commonMatches.filter((val)=>val.expected);
                
                setExpected(expetedFullMatches);
                setUserExpections(Expected);

            }catch(err){
                console.log(err);
            }
        }
    },[])

    return ( 
        <div className={`myexpects ${isDark? 'dark': ''}`}>
            <div className="headlineWrapper">
                <h1 className="headline">Your Full Expects</h1>
            </div>

            <div className="expectsContainer">
                {
                    expected.map((val,index)=>{
                            return <Expect key = {index} userExpect = {userExpections[index]} match={val}/> // since the have the same length and each one meet the same in the other array

                        
                    })
                }
            </div>
        </div>
     );
}
 
export default MyExpects;