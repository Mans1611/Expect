const time = new Date('4, 19,2022,15:00').getTime();
export const timeCounter = ()=>{
    setInterval(()=>{
    let current = new Date().getTime();
    let left = time-current;
    let hours = Math.floor(left/(1000*60*60));
    let min = Math.floor((left%(1000*60*60))/(1000*60));
    let sec = Math.floor((left%(1000*60))/(1000));
    return {hours,min,sec}
    },1000)
}