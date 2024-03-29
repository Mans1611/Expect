import React, { useEffect, useReducer, useState } from 'react'
import Axios from '../../Axios/axios';
import { globalUser } from '../../Context/HomeContext';
import { initPick_Player, ReduceFn } from './Reducer/Reducer';
import { handleBack } from './utilis/handleNext';

const PickPlayers = ({fetchCountry,user,setSkip,setUser,profileSet,updateGoldenPlayer}) => {
    const [players,setPlayers] = useState([]) ;
    const [selectedPlayer,setSelectedPlayer] = useState(null);
    const [submitStatue,dispatchStatue] = useReducer(ReduceFn,initPick_Player);
    const {userGlob,token,setGoldenPlayer} = globalUser();

    
    useEffect(()=>{
        let isSubscribe = true;

        const fetchPlayers = async()=>{
            try{
                const {data} = await Axios.get(`/country/players?countryName=${fetchCountry.countryName}`);
                if(isSubscribe)
                    setPlayers(data);
              
            }catch(err){
                console.log(err);

            }
        }
        fetchPlayers();
        return ()=> isSubscribe = false;
    },[fetchCountry])

    const handlePostPlayer = async ()=>{
        
        if(!selectedPlayer)
            return dispatchStatue({type:'invalid', payload : "Select a Player"})
        
        else {
            if(!updateGoldenPlayer){
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
                    setGoldenPlayer(data.user.goldenPlayer);
                    console.log(data.user.goldenPlayer);
                    setTimeout(()=> setSkip(true),2000)
               }
            }
            if(updateGoldenPlayer){
                const {data,status} = await Axios.put(`/users/updateGoldenPlayer/${userGlob}`,selectedPlayer,{
                    headers : {
                        token ,
                        userGlob
                    }
                })
                if(status === 203)
                    return dispatchStatue({type:'invalid', payload : data.msg});
                    
                else if(status === 200){
                    dispatchStatue({type:'success', payload :data.msg})
                    setUser(data.user);
                    setTimeout(()=> setSkip(true),2000)
               }
            }
        }
    }

    const handleSelectPlayer = (player,index)=>{
        return setSelectedPlayer({
            ...player,
            index,
            countryName : fetchCountry.countryName,
            logo:fetchCountry.logo,
            pickedTime: new Date()
        })
    }


  return (
    <div id='choosePlayer-container' className="chooseCountry-container choosePlayer-container">
        <h2>Choose Your Player </h2>
        <div  className="country-container">
            {players.length === 0 ? <div className="noContent"> No Players </div>
            :
            players.map((player,index)=>{
                return (
                    <div onClick={()=>handleSelectPlayer(player,index)} key={index} className={`country-holder ${selectedPlayer?.index === index ? 'selected-country':''}`}>
                        <img className='playerImg' src={player.playerImg} alt={player.playerName}/>
                        <h2 >{player.playerName}</h2>
                        <h4>{player.position}</h4>
                    </div>                
                    )
            })}
        </div>

        {submitStatue.showMsg && <div className={`msg ${submitStatue.color}`}>{submitStatue.msg}</div>}
        <div className="button-wrapper-golden">
            <button onClick={()=>handleBack('chooseCountry-container','choosePlayer-container')} className="back">Back</button>
            <button onClick={handlePostPlayer}  className="next">Submit</button>
        </div>
        
    </div>

    )
}

export default PickPlayers