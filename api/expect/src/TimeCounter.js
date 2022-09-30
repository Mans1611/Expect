import {useEffect,useState} from 'react'


const TimeCounter = ({matchTime,setTimeUp})=>{
    
    
    const [hours,setHours] = useState(0);
    const [min,setMin] = useState(0);
    const [sec,setSec] = useState(0);
    
    
    let Hours = 0,Min = 0,Sec = 0;  // just temp variables to hold time 
    
    
    const time = new Date(matchTime).getTime();  // to get time in milleseconds 
    
    useEffect(()=>{

        let subscribe = true;
       
        
        let now = new Date().getTime();
        let left = time - now ;

        let interval ; // undefined 

            if(left > 0){
                interval =  setInterval(()=>{
                    left = time-now;
                    if(left>0){
                        Hours = Math.floor(left/(1000*60*60));
                        Min = Math.floor((left%(1000*60*60))/(1000*60));
                        Sec = Math.floor((left%(1000*60))/(1000));
                        if(subscribe){
                            setHours(Hours);
                            setMin(Min);
                            setSec(Sec);
                        }
                    }
                    else{
                        setTimeUp(true);                        
                    }
                },1000); 
            }
            
            else{
                setTimeUp(true);
            }


            // clean-up function.   
            return ()=> {
                clearInterval(interval)
                subscribe = false;
            }

            console.log("time is rendering");
        },[sec])
        

    return (
            <div className="matchCardCounter">
                <span className="timeLeftLabel">Time Left </span>
                <span className="timeLeft"> {(hours<10)? `0${hours}`: hours} : {(min<10)? `0${min}`: min} : {(sec<10)? `0${sec}`: sec}</span>
            </div>
        
    )

}

export default TimeCounter ; 