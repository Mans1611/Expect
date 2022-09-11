import './roundStanding.scss'
import React,{useState,useEffect} from 'react'
import UserStanding from '../Standing/UserStanding';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import Axios from '../../../Axios/axios';
import { useContext } from 'react';
import { createContext } from 'react';
import RoundUserStanding from './RoundUserStanding';


const RoundStanding = () => {
    const [selectedRound,setRound] = useState("Group Stage Round-1");
    const [users,setUsers] = useState([]);
    const [isLoading,setLoading] = useState(true);
    
    useEffect(()=>{
        setLoading(true)
        return async()=>{
            const {data} = await Axios.get(`/statistics/topusers/?round=${selectedRound}`);
            setUsers(data);
            setLoading(false);
        }
    },[])

    const handleChange = async(selected)=>{
        setLoading(true)
        const {data} = await Axios.get(`/statistics/topusers/?round=${selected}`);
        setUsers(data);
        setLoading(false);
        setRound(selected)
    }
  return (

        <div className='RoundStanding'>
            <div className="selection-wrapper">
                <select onChange={(e)=>handleChange(e.target.value)} name="round-selection" id="round-selection">
                    <option>Group Stage Round-1</option>
                    <option>Group Stage Round-2</option>
                    <option>Group Stage Round-3</option>
                    <option>Round-16</option>
                    <option>Quarter-Final</option>
                    <option>Semi-Final</option>
                    <option>3rd Place Winner</option>
                    <option>Final</option>
                </select>
                {isLoading ? <SmallLaoding/>:
                    <RoundUserStanding users={users} selectedRound={selectedRound} />
                }
                
                
            </div>
        </div>
  )
}

export default RoundStanding;

