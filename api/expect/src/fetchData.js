const axios = require('axios');
const  fetchData = async(url)=>{
    try{
        const {data} = await axios.get(url);
        return data;
        
    }catch(err){
        console.log(err);
        console.log("mansour");
    }
}
export default fetchData;