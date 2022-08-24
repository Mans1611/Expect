import React, {useState} from 'react'
import Minute from '../../../adminPage/component/MatchCardComponent/Minute';
import { globalUser } from '../../../Context/HomeContext';
import './phoneExpect.scss';
import TimeCounter from '../../../TimeCounter';
import PopMatchCard from '../../popmatchcard/PopMatchCard';
import '../../popupmatchcard.scss';
import MatchState from '../../MatchState/MatchState';
import Axios from '../../../Axios/axios';
import axios from 'axios';

const ExpectPhone = ({match,userExpect,setLoading,setUserExpections})=> {
    document.getElementsByTagName("body")[0].style.overflow = 'visible'; 
    if(!userExpect)
        return null;
    const {isDark} = globalUser();
    const [timeUp, setTimeUp] = useState(false);
    const [pop,setPop] = useState(false);
    const [statePop,setStatePop] = useState(false);
    const [min,setMin] = useState(0)
    const [popDelete,setPopDelete] = useState(false);

    return (
    <div className='expectPhone'>
        <div className="upperExpectWrapper">
            <div className="countryWrapper">
                <img className='countryFlages' src={match.firstCountry.logo} alt="" />
                <div className={`dimond firstDimond ${!timeUp && 'transparent'}`}>
                    <div className='dimondContent'>
                        {timeUp && match.firstCountry.result}
                    </div>
                </div>
            </div>
            <div className="middle">

                {timeUp ? match.fullTime ? "FT" : <Minute min = {min}  setMin = {setMin} matchTime={match.matchTime}/> : <TimeCounter setTimeUp = {setTimeUp} matchTime={match.matchTime}/> }

            </div>
            <div className="countryWrapper">
                <div className={`dimond secondDimond ${!timeUp && 'transparent'}`}>
                    <div className='dimondContent'>
                        {timeUp && match.secondCountry.result}
                    </div>
                </div>
                <img className='countryFlages' src={match.secondCountry.logo} alt="" />
            </div>
        </div>
        {
            timeUp &&
            <div className="points-wrapper">
                Total Points : {userExpect.userPoints}
            </div>

        }
        <div className="ExpectPhoneWrap">
           {timeUp ?
                <button onClick={()=>setStatePop(true)}>Expect Points</button> : 
               
                        <div className='button-wrapper'>
                            <button onClick={()=>setPopDelete(true)} className='danger'> Delete Expect </button>
                            <button onClick={()=>setPop(true)}> Edit Expect </button>
                        </div>
            }
        </div>
        {pop && <PopMatchCard userExpect={userExpect} match={match}  setPop = {setPop} />}
        {popDelete && <PopDelete match={match} setUserExpections={setUserExpections} setLoading ={setLoading} setPopDelete={setPopDelete}/> }
        { statePop && timeUp && <MatchState expected = {true} userExpect={userExpect}  setPop = {setStatePop} match={match}/>} 
          
    </div>
  )
}

const PopDelete = ({setPopDelete,match,setLoading,setUserExpections})=>{
    const {userGlob,isDark} = globalUser();

    const handldeDeleteExpect = async(e) =>{
        setLoading(true)
        e.preventDefault();
        try{
            const response = await axios.delete(`/expects/deleteExpect/${userGlob}/${match.matchId}`)
            setPopDelete(false);
            setUserExpections(response.data);
            setLoading(false);
        }
        catch(err){
            console.log(err);
        }

}
    return(
        <div className="popMatchFullPage">
            <div className="deleteContainer">
                <h1 className="title">Delete Expect</h1>
                <p>Please Confirm that you want to delete <span className='dangerWord'>{match.firstCountry.countryName} - {match.secondCountry.countryName} </span>Expect</p>
                <button onClick={handldeDeleteExpect} className='danger'>Confirm</button>
            </div>
        </div>
    )
}
export default ExpectPhone