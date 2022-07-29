import React , {useEffect,useState} from 'react'
import ExpectPhone from '../../component/Expectes/PhoneComponent/ExpectPhone';
import './standing.scss';

import io from 'socket.io-client';
import TopPlayers from '../../component/TopPlayers/TopPlayers';
import HomeStanding from '../../component/HomeStanding/HomeStanding';
import { globalUser } from '../../Context/HomeContext';

const socket = io.connect('http://localhost:8000');


const States = ()=> {
    const [message,setMessage]= useState("");
    const [display,setDispaly] = useState("")

    const listen = ()=>{
        socket.emit("sendMessage",{message});
    }
    const {isDark} = globalUser();

    useEffect(() => {
        socket.on("mansour",(data)=>{
            setDispaly(data.message);
                })
                console.log(display);
        
    }, [socket])
    
    
  return (
    <div className={`states ${isDark ? 'dark' : ''}`}>
        <div className="statesTitle">
          Statistics
        </div>
        <TopPlayers/>
        <HomeStanding/>
    </div>
  )
}

export default States;