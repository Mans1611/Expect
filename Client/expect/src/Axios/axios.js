import axios from 'axios';

const Axios = axios.create({
    timeout : 1000 * 30,
    validateStatus : (status)=>{
        return status >= 200 && status < 500 ; 
    } 
})


export default Axios;