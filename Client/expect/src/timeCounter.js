import {useEffect,useState} from 'react'
import Axios from './Axios/axios';

const TimeCounter = ({matchTime,setTimeUp,matchId})=>{
    
    const time = new Date(matchTime).getTime();
    let left = 999999;

    const [hours,setHours] = useState(0);
    const [min,setMin] = useState(0);
    const [sec,setSec] = useState(0);
    let Hours = null,Min = null,Sec = null;
    
    const updatematch = async()=>{
        try{
            await Axios.put(`/matches/editmatch/${matchId}`,{
                started : true,
            })
        }
        catch(err){
            console.log(err);
        }
    }

    if(time > (new Date().getTime())){
        useEffect(()=>{
            let current = new Date().getTime();
            left = time-current;
    
            if(left <= 0)
                setTimeUp(true);
               

            const interval = setInterval(()=>{
            current = new Date().getTime();
            left = time-current;
            Hours = Math.floor(left/(1000*60*60));
            Min = Math.floor((left%(1000*60*60))/(1000*60));
            Sec = Math.floor((left%(1000*60))/(1000));
            setHours(Hours);setMin(Min);setSec(Sec);
            },1000)

            return ()=> clearInterval(interval);
    
        },[sec])

    }
    else{
        setTimeUp(true)
        updatematch();
    }

    return (
            <div className="matchCardCounter">
                <span className="timeLeftLabel">Time Left:</span>
                <span className="timeLeft">{(hours<10)? `0${hours}`: hours} : {(min<10)? `0${min}`: min} : {(sec<10)? `0${sec}`: sec}</span>
            </div>
        
    )

}

export default TimeCounter ; 