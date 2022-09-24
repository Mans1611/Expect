import react , {useState,useEffect} from 'react';
import Axios from '../Axios/axios';
import { globalUser } from '../Context/HomeContext';

const fetchGoldenPlayerHook = () =>{
    const {userGlob,token,setGoldenPlayer} = globalUser(); 
    const [isLoading,setLoaidng] = useState(true);
    

    useEffect(()=>{
        let isSubscribe = true;

        const fetchGoldenPlayer = async()=>{
            try{
                const {data} = await Axios.get(`/expects/calculategoldenPlayer/${userGlob}`,{
                    headers : {
                        token
                    }});
                    if(isSubscribe){
                        setGoldenPlayer(data.goldenPlayer);
                    }
                    setLoaidng(false)
            }catch(err){
                console.log(err);
            }
        }
        
        if(userGlob)
            fetchGoldenPlayer();  
        
        ()=> isSubscribe = false;
    },[userGlob]);

    return [isLoading]; 
}


export default fetchGoldenPlayerHook;


