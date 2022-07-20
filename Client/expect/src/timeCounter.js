import {useEffect,useState} from 'react'

const TimeCounter = ({matchTime,setTimeUp})=>{
    
    const time = new Date(matchTime).getTime();
    let left = 999999;

    const [hours,setHours] = useState(0);
    const [min,setMin] = useState(0);
    const [sec,setSec] = useState(0);
    useEffect(()=>{
        let current = new Date().getTime();
        left = time-current;
        if(left <= 0){
            setTimeUp(true);
        }
        setInterval(()=>{
        current = new Date().getTime();
        left = time-current;
        
        let Hours = Math.floor(left/(1000*60*60));
        let Min = Math.floor((left%(1000*60*60))/(1000*60));
        let Sec = Math.floor((left%(1000*60))/(1000));
        setHours(Hours);setMin(Min);setSec(Sec);
        },1000)

        

    },[sec])



    return (
            <div className="matchCardCounter">
                <span className="timeLeftLabel">Time Left:</span>
                <span className="timeLeft">{(hours<10)? `0${hours}`: hours} : {(min<10)? `0${min}`: min} : {(sec<10)? `0${sec}`: sec}</span>
            </div>
        
    )

}

export default TimeCounter ; 