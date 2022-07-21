import { ArrowDownward } from '@mui/icons-material';
import React, {useState} from 'react'
import Minute from '../../../adminPage/component/MatchCardComponent/Minute';
import { globalUser } from '../../../Context/HomeContext';
import './phoneExpect.scss';
import TimeCounter from '../../../TimeCounter';
import UpdatePopUp from '../../UpdatePopUp/UpdatePopUp';
import '../../popupmatchcard.scss';
const ExpectPhone = ({match,userExpect})=> {

    const {isDark} = globalUser();
    const [timeUp, setTimeUp] = useState(false);
    const [updatePop,setUpdatePop] = useState(false);
    
    const showEditExpect = (e)=>{
        e.preventDefault();
        setUpdatePop(true);

    }

    const togglePop = (e)=>{
        setUpdatePop(false);
    }

    return (
    <div className='expectPhone'>
        <div className="upperExpectWrapper">
            <div className="countryWrapper">
                <img className='countryFlages' src={match.firstCountry.logo} alt="" />
                <div className="dimond firstDimond">
                    <div className='dimondContent'>
                        {timeUp && match.firstCountry.result}
                    </div>
                </div>
            </div>
            <div className="middle">

                {timeUp ? match.fullTime ? "FT" : <Minute matchTime={match.matchTime}/> : <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime}/> }

            </div>
            <div className="countryWrapper">
                <div className="dimond secondDimond">
                    <div className='dimondContent'>
                        {timeUp && match.secondCountry.result}
                    </div>
                </div>
                <img className='countryFlages' src={match.secondCountry.logo} alt="" />
            </div>
        </div>
        <div className="ExpectPhoneWrap">
            <button onClick={()=>setUpdatePop(true)}> Edit Expect </button>
        </div>
        {!showEditExpect && <UpdatePopUp match={match} togglePop={togglePop} />}
    </div>
  )
}

export default ExpectPhone