import React, { useEffect, useReducer, useState } from 'react'
import Axios from '../../Axios/axios';
import { globalUser } from '../../Context/HomeContext';
import { initPick_Player, ReduceFn } from './Reducer/Reducer';
import { handleBack } from './utilis/handleNext';

const PickPlayers = ({fetchCountry,user,setSkip}) => {
    const [players,setPlayers] = useState([]) ;
    const [selectedPlayer,setSelectedPlayer] = useState(null);
    const [submitStatue,dispatchStatue] = useReducer(ReduceFn,initPick_Player);

    const {userGlob,token} = globalUser();

    
    useEffect(()=>{
        const fetchPlayers = async()=>{
            try{
                const {data} = await Axios.get(`/country/players?countryName=${fetchCountry.countryName}`);
                setPlayers(data);
               
            }catch(err){
                console.log(err);

            }
        }
        fetchPlayers();
    },[fetchCountry])

    const handlePostPlayer = async ()=>{
        if(!selectedPlayer)
            return dispatchStatue({type:'invalid', payload : "Select a Player"})
        
        else {
            const {data,status} = await Axios.post(`/users/postGoldenPlayer/${userGlob}`,selectedPlayer,{
                headers : {
                    token ,
                    userGlob
                }
            })
            if(status === 203)
                return dispatchStatue({type:'invalid', payload : data.msg});
                
            else if(status === 200){
                dispatchStatue({type:'success', payload :data.msg})
                setTimeout(()=> setSkip(true),2000)
           }

        }
    }


  return (
    <div id='choosePlayer-container' className="chooseCountry-container choosePlayer-container">
        <h2>Choose Your Player </h2>
        <div  className="country-container">
            {players.length === 0 ? <div className="noContent"> No Players </div>
            :
            players.map((player,index)=>{
                return (
                    <div onClick={()=>setSelectedPlayer({...player,index})} key={index} className={`country-holder ${selectedPlayer?.index === index ? 'selected-country':''}`}>
                        <img className='playerImg' src={player.playerImg} alt={player.playerName}/>
                        <h2>{player.playerName}</h2>
                        <h4>{player.position}</h4>
                    </div>                
                    )
            })}
        </div>

        {submitStatue.showMsg && <div className={`msg ${submitStatue.color}`}>{submitStatue.msg}</div>}
        <div className="button-wrapper">
            <button onClick={()=>handleBack('chooseCountry-container','choosePlayer-container')} className="back">Back</button>
            <button onClick={handlePostPlayer}  className="next">Submit</button>
        </div>
        
    </div>

    )
}

export default PickPlayers