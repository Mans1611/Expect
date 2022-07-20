import './popupmatchcard.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState,useContext } from 'react';
import axios from 'axios';
import Loading from '../loading/big.loading/Loading';

import PlayerCard from './playercard/PlayerCard';
import BalanceIcon from '@mui/icons-material/Balance';
import { ThemeContext } from '../../App';
import { globalUser } from '../../Context/HomeContext';
import PlayerCardRadio from '../PlayerCardRadio/PlayerCardRadio';
import { useParams } from 'react-router-dom';
import { useReducer } from 'react';
import { MatchCardContext } from '../matchcards/MatchCard';
const PopMatchCard = (props) => {

    const {isDark,userGlob} = globalUser();
    const [showMsg,setShow] = useState(false); // to show the error msg for non valid result

    
    const hidePop = (e)=>{
        if(e.target.className === 'popMatchFullPage')
        props.togglePop(false);
    }

    const reducerFN = (state, action)=>{
        switch(action.type){
            case 'warnMsg' : 
                return { msg : 'Your Expected Result Do Not Match With The Winner',className : "warnMsg",showMsg:true};
            
            case 'success':
                return {msg : action.payload ,showMsg:true,className : 'succsess' };
            default : 
                throw new Error('error in resucer')    
        }

    }
    const [Msg,dispatch] = useReducer(reducerFN,{msg : '',className:'',showMsg : false} )

    const handlePost = async (e)=>{
        e.preventDefault();
        const winnerValue = document.querySelector('input[name="countryWinner"]:checked').id;
        const result1_value = document.querySelector('input[id="result_1"]').value;
        const result2_value = document.querySelector('input[id="result_2"]').value;
        const firstPlayer_value = document.querySelector('input[name="firstCountry"]:checked').id;
        
        let mutatePlayer1,mutatePlayer2 ;
         props.match.firstCountry.players.find((player,index)=> {
            
            if(player.playerName === firstPlayer_value){
                mutatePlayer1 = {...player,index:index};
            }
        }) 
        const secondPlayer_value = document.querySelector('input[name="secondCountry"]:checked').id;
        
        props.match.secondCountry.players.find((player,index)=> {
            if(player.playerName === secondPlayer_value){
                mutatePlayer2 = {index:index,...player};
            }
        })

        console.log(mutatePlayer1);
        console.log(mutatePlayer2);

        if((result1_value === result2_value && winnerValue !== 'draw') || (result1_value !== result2_value && winnerValue === 'draw') ){
            dispatch({type:"warnMsg"})
            return 0 ;
        }
       
        
        try{
            console.log(userGlob);
            const response = await axios.post(`/expects/addexpect/${userGlob}`,{
                winnerValue,
                result1_value,
                result2_value,
                mutatePlayer1,
                mutatePlayer2,
                matchId : props.match.matchId
            });
            if(response.status === 201){
                console.log(response.data.msg);
                dispatch({type:"success",payload:response.data.msg});
    
                setTimeout(()=>{
                    props.togglePop(false)
            },2000);
            }

        }catch(err){
            console.log(err);
        }

    }


    return (
        <div  onClick={hidePop}  className="popMatchFullPage">
            <div className={`popMatchContainer ${isDark? 'dark':''}`}>
                <form>
                <div className="headerPopUp">
                    <CloseIcon onClick={props.togglePop} className='Popicon'/>
                    <div className="popMatchWinner">
                        <span className="winnerTitle">Select Winner</span>    
                    </div>

                    <div className="matchcardHeader">

                        <label htmlFor={props.match.firstCountry.countryName}>
                            <div className="matchCardCountry">
                                <img src={props.match.firstCountry.logo} alt={props.match.firstCountry.countryName}   className="popMatchCardCountryImg" />
                                <span className='countryLabel'>{props.match.firstCountry.countryName}</span>
                                <input  type="radio" name="countryWinner" id={props.match.firstCountry.countryName} />
                            </div>
                        </label>
                        
                        <label htmlFor="draw">
                            <div  className="matchCardCountry flex ">
                                <div className="icon"><BalanceIcon /></div>
                                <span className='countryLabel'>Draw</span>
                                <input defaultChecked type="radio" name="countryWinner" id="draw" />
                            </div>
                        </label>
                        <label htmlFor={props.match.secondCountry.countryName}>
                            <div className="matchCardCountry">
                                <img  src={props.match.secondCountry.logo} alt={props.match.secondCountry.countryName} className="popMatchCardCountryImg" />
                                <span className='countryLabel'>{props.match.secondCountry.countryName}</span>
                                <input type="radio" name="countryWinner" id={props.match.secondCountry.countryName} />
                            </div>
                        </label>
                    </div>
                </div>

                <div className="formContainerPopup">
                        <h2 className="expectResult">Expect Result</h2>
                        <div className="inputcontainer">
                            <input defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_1" className="result" />
                            <input defaultValue={0} maxLength={1} type="number" name="matchResult" id="result_2" className="result" />
                            
                        </div>
                        <div className="matchCardPlayers">
                            <h2 className="countryLabel">Select Player from {props.match.firstCountry.countryName}</h2>
                            <div className="playersContainer">
                            {props.match.firstCountry.players.map((player,index)=>
                                <PlayerCardRadio  countryOrder= 'firstCountry' player={player} key={index} />
                                )}
                            </div>
                            <h2 className="countryLabel"> Select Player from {props.match.secondCountry.countryName}</h2>
                            <div className="playersContainer">
                                {props.match.secondCountry.players.map((player,index)=>{
                                    return <PlayerCardRadio countryOrder= 'secondCountry' key={index} player = {player}/>
                                })}
                            </div>
                        </div>
                        {Msg.showMsg && <div className={Msg.className}>{Msg.msg} </div>}
                        <div className="buttonsWrapper">
                            <button onClick={handlePost} className='matchCardButton save' >Save</button>
                        </div>



                </div>
                </form>

                
                
                
            </div>

        </div>
   
        
        
     );
}
 
export default PopMatchCard;