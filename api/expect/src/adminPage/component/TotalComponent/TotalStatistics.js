import React,{useState,useEffect} from "react";
import SmallLoading from '../../../component/loading/small.loading/smallLoading'
import Axios from "../../../Axios/axios";

const TotalStatistics = ()=>{

    const [total,setTotal]= useState([]);
    const [isLoading,setLoading] = useState(true);
    
    useEffect(()=>{
        let isSubscribe = true;

        const fetchTotal = async ()=>{
            try{
                const {data} = await Axios.get('/statistics/gettotal');
                if(isSubscribe)
                    setTotal(data);
                setLoading(false);
            }catch(err){
                console.log(err);
            }

        }
        
        fetchTotal();

        return ()=> isSubscribe = false;
    },[])

    return(
        <div className="totalContainer">
        {
            isLoading ? <SmallLoading/>  : 
            <>
            {
                total.map((value,index)=>{
                    return (
                        <div key={index} className="totalWrapper">
                            <h4 className="title">{value.title}</h4>
                            <h1 className="number">{value.number}</h1>
                        </div>
                        )
                })
            }
            </>
           
        }
        </div>
    )
}

export default TotalStatistics;