import './matchesad.scss';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useEffect, useState } from 'react';
import PopAddMatch from '../../component/PopAddMatch/PopAddMatch';
import MatchCardAdm from '../../component/MatchCardAdm/MatchCardAdm';
import axios from 'axios';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import { matchesStore } from '../../Context/matchesContext';
import io from 'socket.io-client';
import { AdminContext } from '../../Context/ProtectedAdmin';
import { MatchCardProvider } from '../../../Context/MatchCardContext';
import Axios from '../../../Axios/axios';


// api : http://localhost:8000
 // https://expect-app.herokuapp.com/
 
const socket = io.connect('https://expect-app.herokuapp.com/',{
        withCredentials: true,
        extraHeaders: {
        "my-custom-header": "abcd"
    }
    }
); // we connect it to the bakend server;


// const socket = io.connect('http://localhost:8000',{
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// }); // we connect it to the bakend server;


const MathcesAdm = () => {
    document.body.style.overflow = 'visible';
    const [showPop,setShowPop] = useState(false) ;
    const store = matchesStore();

    const {adminAuth, setAdminAuth} = AdminContext();
    

    useEffect(()=>{
        let isSubscribe = true;
        const fetchMatches = async()=>{
            try{
                const {data} = await Axios.get('/matches/getmatches')
                if(isSubscribe)
                    store.setMatches(data.reverse());
                store.setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchMatches();

        return ()=> isSubscribe = false;

    },[])

    useEffect(()=>{
       let isSubscribe = true; 
            socket.on("updatingMatches",(matches)=>{
                if(isSubscribe)
                    store.setMatches(matches);
            })

            return ()=> isSubscribe = false;
    },[socket])

    
    return ( 
        <div className="matchesadmin">
            {showPop && <PopAddMatch showPop={showPop} setShowPop={setShowPop}/>}
            <div className='matchesContainer'>
                {
                    store.isLoading ? <SmallLaoding/>:
                    (
                        store.matches.map((match,index)=> 
                        <MatchCardProvider key={index}
                            match={match} childeren = {<MatchCardAdm  key={index}/>}>
                        </MatchCardProvider>)
                    )
                }
            </div>
            <div className="buttonContainer">
                <button onClick={()=>setShowPop(!showPop)}  className="addMatch">
                    <span>Add Match</span>
                    <NoteAddIcon/>
                </button>
            </div>  
        </div>
     );
}
 
export default MathcesAdm;