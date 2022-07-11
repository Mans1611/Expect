import './matchesad.scss';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useEffect, useState } from 'react';
import fetchData from '../../../fetchData';
import Loading from '../../../component/loading/big.loading/Loading';
import MathchCard from '../../../component/matchcards/MatchCard';
import PopAddMatch from '../../component/PopAddMatch/PopAddMatch';
import MatchCardAdm from '../../component/MatchCardAdm/MatchCardAdm';
import axios from 'axios';
import SmallLaoding from '../../../component/loading/small.loading/smallLoading';

const MathcesAdm = () => {
    const [matches,setMatches] = useState([]);
    const [showPop,setShowPop] = useState(false) ;
    const [isLoading,setLoading] = useState(true);
    useEffect(()=>{
        return async()=>{
            try{
                const response = await axios.get('/matches/getmatches')
                setMatches(response.data);
                setLoading(false);
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
                    isLoading? <SmallLaoding/>:
                    (
                        matches.map((match,index)=> <MatchCardAdm match={match} key={index}/>)
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