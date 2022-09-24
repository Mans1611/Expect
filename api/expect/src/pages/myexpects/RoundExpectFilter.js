import React,{useState,useEffect} from 'react'
import filteringExpects from '../matches/utilites/filteringExpects';
import Axios from '../../Axios/axios';
import { globalUser } from '../../Context/HomeContext';



const RoundExpectFilter = ({setLoading,filterDispatch,setTotalPoints,setExpected,setUserExpections}) => {

  const {userGlob,token} = globalUser();
  

  const handleChange = async(selected)=>{
    
    setLoading(true);

    filterDispatch({type : "changeRound",payload : selected});
    
    try{
        const {userExpections,totalPoints,filterMatches} = await Axios.get(`/expects/getExpect/${userGlob}?round=${selected}`,{
            headers:{
                token  
            }
        });
       
        setExpected(filterMatches);
        setTotalPoints(totalPoints);
        setUserExpections(userExpections);
      
        setLoading(false);
     }catch(err){
      console.log(err);
     }

  }  

  return (
    <div className="round-filter-container">
        <div className="timing">
            <label htmlFor="round-filter">
                <h1>Round : </h1>
                <select onChange={(e)=>handleChange(e.target.value)} type="text" name="round-filter" id ="round-filter" >
                    <option  selected disabled>Pick Round</option>
                    <option>Group Stage Round-1</option>
                    <option>Group Stage Round-2</option>
                    <option>Group Stage Round-3</option>
                    <option>Round-16</option>
                    <option>Quarter-Final</option>
                    <option>Semi-Final</option>
                    <option>3rd Place Winner</option>
                    <option>Final</option>
                </select>
            </label>
    </div>
    </div>
  )
}

export default RoundExpectFilter