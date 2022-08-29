import React,{useState,useEffect} from 'react'
import filteringExpects from '../utilites/filteringExpects';
import Axios from '../../../Axios/axios';
import { globalUser } from '../../../Context/HomeContext';



const RoundFilter = ({setLoading,setData,filterDispatch,userExpections}) => {
  const {userGlob,token} = globalUser();
  

  const handleChange = async(selected)=>{
     try{
      setLoading(true);
      filterDispatch({type : "changeRound",payload : selected});
      
      const matchesRes = await Axios.get(`/matches/?${selected?`&round=${selected}` : '' }`); // array of todays' matches
      const MatchesWithFlag = filteringExpects(matchesRes.data,userExpections);
      setData(MatchesWithFlag);
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
                    <option value={null} selected disabled>Pick Round</option>
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

export default RoundFilter