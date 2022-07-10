import './matchesad.scss';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useEffect, useState } from 'react';
import fetchData from '../../../fetchData';
import Loading from '../../../component/loading/big.loading/Loading';
import MathchCard from '../../../component/matchcards/MatchCard';
import PopAddMatch from '../../component/PopAddMatch/PopAddMatch';
const MathcesAdm = () => {
    const [matches,setMatches] = useState([]);
    const [showPop,setShowPop] = useState(false) 
    useEffect(()=>{

        const getMatches = async()=>{
            try{
                const cans =  await fetchData("/matches"); // the cans var stands for the cans as a temp var 
                setMatches(cans);
                
            }catch(err){
                console.log(err);
            }
        }
         getMatches();
    
    },[])

    const popAddMatch = ()=>{
        setShowPop(!showPop);
    }

    return ( 
        <div className="matchesadmin">
            {showPop &&<PopAddMatch/>}
            <div className='matchesContainer'>
                
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