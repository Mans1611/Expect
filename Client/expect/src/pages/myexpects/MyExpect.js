import axios from "axios";
import { useEffect } from "react";
import { globalUser } from "../../Context/HomeContext";

const MyExpects = () => {
    const store = globalUser();
    useEffect(()=>{
        return async()=>{
            try{
                console.log(store.userGlob);
                const response = await axios.get(`/expects/${store.userGlob}`);
                console.log(response.data);

            }catch(err){
                console.log(err);
            }
        }
    },[])
    return ( 
        <div className="myexpects">

        </div>
     );
}
 
export default MyExpects;