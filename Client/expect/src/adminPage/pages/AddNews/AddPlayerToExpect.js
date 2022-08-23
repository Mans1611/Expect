import React from 'react'
import { useState } from 'react';
import Axios from '../../../Axios/axios';
import PlayerCard from '../../../component/popmatchcard/playercard/PlayerCard';

const AddPlayerToExpect = () => {
    const [player,setPlayer] = useState(null);
    const [players,setPlayers] = useState(null);
    const [logo,setLogo] = useState(null);
    const [msg,setMsg] = useState(null);
    const getPlayers = async(e)=>{
        e.preventDefault();
        const countryName = document.getElementById('countryName').value;
        const {data} = await Axios.get(`/country/${countryName}`);
        setPlayers(data.country.players);
        setLogo(data.country.logo);
    }
    const handlePost = async(e)=>{
        e.preventDefault();
        const countryName = document.getElementById('countryName').value;
        const playerIndex = document.getElementById('playerName').value;
        const nextMatch = document.getElementById('nextMatch').value;
        let Player = {...players[playerIndex],nextMatch,country : {logo,countryName}};
        console.table(Player);

        try{
            const response = await Axios.post('/statistics/createPlayertoexpect',Player);
            if(response.status === 200){
                setPlayer(Player);
                setMsg({msg : response.data.msg,color : 'green'});
            }
            else{
                console.log("error occured");
                setMsg({msg : "Error Occured please check the data",color : 'red'});
            } 

        }catch(err){
            console.log(err);
        }
    }
  return (
    <>
      <h1 className='addNewsTitle'> Players To Expect </h1>
            <form className='palyerFormContainer'>
            <div className="input-Container">
                    <label htmlFor="countryName">
                        Country Name 
                        <input  className='playerInput' onChange={(e)=>setNewsImg(e.target.value)} id='countryName' type="text" placeholder='Enter Country Name' />
                    </label>
                    {
                        !players &&
                        <div className="buttonWrapper get">
                            <button onClick={getPlayers} >Get Players</button>
                        </div>
                    }
                </div>
                {
                    players && 
                    <>
                        <div className="input-Container">
                            <label htmlFor="">
                                <select id='playerName' className='playerInput'>
                                        {players.map((player,index)=> <option value={index} key={index}>{player.playerName}</option>)}
                                </select>
                            </label>
                        </div>
                
                
                        <div className="input-Container">
                            <label htmlFor="nextMatch">
                                Next Match Opponent
                                <input  className='playerInput' placeholder='Enter His Next Match' onChange={(e)=>setNewsDetails(e.target.value)} id='nextMatch'/>
                            </label>
                        </div>
                        {player &&
                                <div className="playerWrapper">
                                    <PlayerCard player={player}/>
                                </div>
                            
                        }
                        {
                            msg?.msg && <div className={`msg ${msg.color}`}>{msg.msg}</div>
                        }
                        {
                            !player && 
                            <div className="input-Container">
                                <button onClick={handlePost} className= 'addNewsButton' type="submit">Add Player</button>
                            </div>
                        }
                    </>
                }
                
            </form>
 </>
  )
}

export default AddPlayerToExpect