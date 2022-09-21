import axios from 'axios';


// https://expect-app.herokuapp.com/

const Axios = axios.create({
   baseURL : "http://localhost:8000",
    timeout : 1000 * 80,
    validateStatus : (status)=>{
        return status >= 200 && status < 500 ; 
    } 
})


export default Axios;