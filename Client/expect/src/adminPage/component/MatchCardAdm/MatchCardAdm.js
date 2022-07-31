import '../../../component/matchcards/matchcard.scss' ;
import './matchCardAdm.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { createContext, useState } from 'react';
import UpdateMatch from './utilities/updateMatch/UpdateMatch';
import { matchesStore } from '../../Context/matchesContext';
import axios from 'axios';
import TimeCounter from '../../../TimeCounter';
import Minute from '../MatchCardComponent/Minute';
import { MatchCardProvider , MatchStateCentral} from '../../../Context/MatchCardContext';

const MatchCardAdm = () => {

    const MatchCenteral = MatchStateCentral();
    const date  = MatchCenteral.match.matchTime.slice(0,10).replaceAll(',' , "-"); // to just to take the the date from the database
    const time  = MatchCenteral.match.matchTime.slice(11); // to show the time
    const [showDelete,setShowDelte] = useState(false);
    const [timeUp,setTimeUp] = useState(false); 
    const [min,setMin] = useState(null);
    const handleDelte = async(matchId) =>{
        try{
            const response = await axios.delete(`/matches/deletematch/${matchId}`);
            const {data} = await axios.get('/matches/getmatches')
            setShowDelte(false)
            store.setMatches(data);
        }catch(err){
            console.log(err);
        }
    }




    return (
        
            <div className="matchCard dark admin">
                <div className="matchcardHeader">
                    <div className="matchCardCountry"> {/* country1.*/ }
                        <img src={MatchCenteral.match.firstCountry.logo} alt="" className="matchCardCountryImg" />
                        <span className='countryLabel'>{MatchCenteral.match.firstCountry.countryName}</span>
                        <span className='countryLabel'>{MatchCenteral.match.firstCountry.result}</span>
                    </div>
                    VS 
                    <div className="matchCardCountry">      
                        <img src={MatchCenteral.match.secondCountry.logo} alt="" className="matchCardCountryImg" />
                        <span className='countryLabel'>{MatchCenteral.match.secondCountry.countryName}</span>
                        <span className='countryLabel'>{MatchCenteral.match.secondCountry.result}</span>
                    </div>

                </div>
                {timeUp && !MatchCenteral.match.fullTime && <Minute matchId = {MatchCenteral.match.matchId} min={min} setMin = {setMin} matchTime = {MatchCenteral.match.matchTime}/>}
                
                {
                    !timeUp &&
                <TimeCounter matchTime = {MatchCenteral.match.matchTime}  setTimeUp={setTimeUp}/>
            }
                <div className="matchCardCounter">
                        <div className="timeLeftLabel">Match Date : <span className="timeLeft">{date}</span></div>
                        <div className="timeLeftLabel">Match Time : <span className="timeLeft">{time}</span></div>
                </div>
                <div className="actionsContainers">
                    <div className="buttonWrapper">
                        <button onClick={()=>MatchCenteral.dispatch({type : "ShowUpdate"})} id="editMatch"><EditIcon/></button>
                    </div>
                    <div className="buttonWrapper delete">
                        <button onClick={()=>setShowDelte(!showDelete)} ><DeleteIcon/></button>
                        {showDelete && <button onClick={()=>handleDelte(MatchCenteral.match.matchId)} id="deleteMatch">Confirm</button>}
                    </div>
                    
                </div>
                {MatchCenteral.state.showUpdate && <UpdateMatch min={min}  match = {MatchCenteral.match}/>}
            </div>
            
     );
}
export default MatchCardAdm;