import React, { useEffect, useReducer, useState } from 'react'
import io from 'socket.io-client';
import { preperationFn, preperationObj } from '../Reducer/PreperationReducer';


const socket = io.connect('http://localhost:8000');

const Preperation = ({invitation}) => {
    const [preperationState,dispatch] = useReducer(preperationFn,preperationObj);
    const [ready,setReady] = useState(false);
    const [opponentReady,setOpponentReady] = useState(false);
    const [showworkcaser,setShowWorkCaser] = useState(false);

    const joinRoom = (invitation)=>{
        socket.emit("join_room",  invitation); // joining a private room with secert key.
        setReady(true);

        // if(invitation.type === 'sender')
        //     dispatch({type : 'Oppnent1 is ready'});
        // else {
        //     dispatch({type : 'Oppnent2 is ready'});
        // // }
        
    }

    useEffect(()=>{

        socket.on("OpponentISReady",(data)=>{
            console.log(invitation);
            console.log(data);

           if(data.type !== invitation.type)
                setOpponentReady(true);
            if(ready && opponentReady)
            {
                socket.emit('ShowRockCaser',{...invitation,showWorkCaser : true});
                setShowWorkCaser(true);
            }
        })
        socket.on("showCaser",(data)=>{
           
            if(data.showWorkCaser)
                setShowWorkCaser(true);
        })

        return ()=> {
            socket.emit("leaveRoom")
        };

    },[socket])
    

    return (
    <div className="ready-container">
        <h3>Your Opponent has to be ready as well to pick Players</h3>
        <button onClick={(e)=>{e.preventDefault();joinRoom(invitation)}} className="ready">Ready</button>
        {showworkcaser && <h1>Caser</h1>}
    </div>
  )
}

export default Preperation