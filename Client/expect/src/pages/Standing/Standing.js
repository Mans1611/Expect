import React , {useEffect,useState} from 'react'
import ExpectPhone from '../../component/Expectes/PhoneComponent/ExpectPhone';
import './standing.scss';

import io from 'socket.io-client';

const socket = io.connect('http://localhost:8000');


const Standing = ()=> {
    const [message,setMessage]= useState("");
    const [display,setDispaly] = useState("")

    const listen = ()=>{
        socket.emit("sendMessage",{message});
    }


    useEffect(() => {
        socket.on("mansour",(data)=>{
            setDispaly(data.message);
                })
                console.log(display);
        
    }, [socket])
    
    
  return (
    <div className='Standing'>
        <input type="text" name="" id="" onChange = {(e)=>setMessage(e.target.value)} />
        <button onClick={listen}> Manosurt</button>
        {display}
    </div>
  )
}

export default Standing