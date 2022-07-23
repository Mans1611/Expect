import './matchesad.scss';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useEffect, useState } from 'react';
import PopAddMatch from '../../component/PopAddMatch/PopAddMatch';
import MatchCardAdm from '../../component/MatchCardAdm/MatchCardAdm';
import axios from 'axios';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';
import { matchesStore } from '../../Context/matchesContext';

const MathcesAdm = () => {
    //const [matches,setMatches] = useState([]);
    const [showPop,setShowPop] = useState(false) ;
    const store = matchesStore();
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

    const popAddMatch = ()=>{
        setShowPop(!showPop);
    }

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
                <button onClick={popAddMatch}  className="addMatch">
                    <span>Add Match</span>
                    <NoteAddIcon/>
                </button>
            </div>  
        </div>
     );
}
 
export default MathcesAdm;