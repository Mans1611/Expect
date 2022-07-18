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
const PopMatchCard = (props) => {
    const {id} = useParams();

    let countries = document.getElementsByClassName('popMatchCardCountryImg');
    const [user,setUser] = useState({});

    const [winner,setWinner] = useState('draw');
    const [result_1,setReault_1] = useState(0)
    const [result_2,setReault_2] = useState(0);
    const [player_1,setPlayer_1] = useState(props.match.firstCountry.players[0])
    const [player_2,setplayer_2] = useState(props.match.secondCountry.players[0]);


    const element = useRef(null);
    const {isDark} = globalUser();
    const [match,setMatch] = useState(null);
    // useEffect(()=>{
        
    //     element.current.addEventListener('click',(e)=>{
    //         if(e.target.className === 'popMatchFullPage')
    //             props.togglePop(!props.pop);
    //     }) 
        
    // },[])

    const handlePost = async (e)=>{
        e.preventDefault();
        const winnerValue = document.querySelector('input[name="countryWinner"]:checked').id;
        setWinner(winnerValue);
        const result1_value = document.querySelector('input[id="result_1"]').value;
        setReault_1(result1_value);
        const result2_value = document.querySelector('input[id="result_2"]').value;
        setReault_2(result2_value);
        const firstPlayer_value = document.querySelector('input[name="firstCountry"]:checked').id;
        setPlayer_1(firstPlayer_value);

        const player1 = props.match.firstCountry.players.filter((player)=> {
            if(player.playerName === firstPlayer_value)
                return player
            
        }) 
        const secondPlayer_value = document.querySelector('input[name="secondCountry"]:checked').id;
        const player2 = props.match.secondCountry.players.filter((player)=> {
            if(player.playerName === secondPlayer_value)
                return player;
        }) 
        
        setPlayer_1(secondPlayer_value);
        try{
            const response = await axios.post('/expects/addexpect/mans1611',{
                winnerValue,
                result1_value,
                result2_value,
                player1,
                player2,
                matchId : props.match.matchId
            });
            console.log(response);
        }catch(err){

        }

    }


    return (
        <div  ref={element}  className="popMatchFullPage">
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
                        <div className="buttonsWrapper">
                            <button onClick={handlePost} className='matchCardButton save' >Save</button>
                        </div>



                </div>
                </form>

                
                
                {/* <div className="matchCardResult"></div> */}
            </div>

        </div>
   
        
        
     );
}
 
export default PopMatchCard;