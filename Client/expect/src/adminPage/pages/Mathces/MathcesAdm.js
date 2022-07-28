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
import { useNavigate } from 'react-router-dom';

const socket = io.connect('http://localhost:8000'); // we connect it to the bakend server;

const MathcesAdm = () => {
    
    const [showPop,setShowPop] = useState(false) ;
    const store = matchesStore();

    const {isAuth, setAdminAuth} = AdminContext();

    const navigate = useNavigate();
    

    useEffect(()=>{
        return async()=>{
            
            try{
                const response = await axios.get('/matches/getmatches')
                store.setMatches(response.data);
                store.setLoading(false);
            }
            catch(err){
                console.log(err);
            }
        } 
    },[])

    useEffect(()=>{
            socket.on("updatingMatches",(matches)=>{
                store.setMatches(matches);
            })
    },[socket])

    
    return ( 
        <div className="matchesadmin">
            {showPop && <PopAddMatch showPop={showPop} setShowPop={setShowPop}/>}
            <div className='matchesContainer'>
                {
                    store.isLoading? <SmallLaoding/>:
                    (
                        store.matches.map((match,index)=> <MatchCardAdm match={match} key={index}/>)
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