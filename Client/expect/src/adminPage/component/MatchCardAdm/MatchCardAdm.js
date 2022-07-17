
import '../../../component/matchcards/matchcard.scss' ;
import './matchCardAdm.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import UpdateMatch from './utilities/updateMatch/UpdateMatch';
import { matchesStore } from '../../Context/matchesContext';
import axios from 'axios';
const MatchCardAdm = ({match}) => {
    const [date , time] = match.matchTime.split(' ');
    const [showDelete,setShowDelte] = useState(false);
    const [showUpdate,setUpdate] = useState(false);

    const store = matchesStore();
    const handleDelte = async(matchId) =>{
        try{
            const response = await axios.delete(`/matches/deletematch/${matchId}`);
            console.log(response.data.msg);
            const {data} = await axios.get('/matches/getmatches')
            store.setMatches(data);
        }catch(err){
            console.log(err);
        }
    }
    return ( 
        <div className="matchCard dark">
            <div className="matchcardHeader">
                <div className="matchCardCountry"> {/* country1.*/ }
                    <img src={match.firstCountry.logo} alt="" className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.firstCountry.countryName}</span>
                </div>
                VS
                <div className="matchCardCountry">
                    <img src={match.secondCountry.logo} alt="" className="matchCardCountryImg" />
                    <span className='countryLabel'>{match.secondCountry.countryName}</span>
                </div>
            </div>
            <div className="matchCardCounter">
                    <div className="timeLeftLabel">Match Date : <span className="timeLeft">{date}</span></div>
                    <div className="timeLeftLabel">Match Time : <span className="timeLeft">{time}</span></div>
            </div>
            <div className="actionsContainers">
                <div className="buttonWrapper">
                    <button onClick={()=>setUpdate(true)} id="editMatch"><EditIcon/></button>
                </div>
                <div className="buttonWrapper delete">
                    <button onClick={()=>setShowDelte(!showDelete)} ><DeleteIcon/></button>
                    {showDelete && <button onClick={()=>handleDelte(match.matchId)} id="deleteMatch">Confirm</button>}
                </div>
                
            </div>
            {showUpdate && <UpdateMatch setUpdate={setUpdate} match = {match}/>}
        </div>
     );
}
 
export default MatchCardAdm;