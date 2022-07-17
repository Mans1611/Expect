import './popupmatchcard.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState,useContext } from 'react';
import axios from 'axios';
import Loading from '../loading/big.loading/Loading';

import PlayerCard from './playercard/PlayerCard';
import { ArrowBackOutlined,ArrowForwardOutlined } from '@mui/icons-material';
import BalanceIcon from '@mui/icons-material/Balance';
import { ThemeContext } from '../../App';
import { globalUser } from '../../Context/HomeContext';
import PlayerCardRadio from '../PlayerCardRadio/PlayerCardRadio';
import { useParams } from 'react-router-dom';
const PopMatchCard = (props) => {
    const {id} = useParams();

    let countries = document.getElementsByClassName('popMatchCardCountryImg');
    const [user,setUser] = useState({})
    const [winner,setWinner] = useState('draw');
    const element = useRef(null);
    const {isDark} = globalUser();
    const [match,setMatch] = useState(null);
    useEffect(()=>{
        for(let i = 0; i<countries.length;i++){
            countries[i].addEventListener('click',function(){
                    let current = document.getElementsByClassName("selectedCount");
                    if(current[0])
                        current[0].className = current[0].className.replace(' selectedCount','');
                    this.className += ' selectedCount';
                })
            }
        element.current.addEventListener('click',(e)=>{
            if(e.target.className === 'popMatchFullPage')
                props.togglePop(!props.pop);
        }) 
        
    },[])

    const handlePost = (e)=>{
        e.preventDefault();
    }


    return (
        <div  ref={element}  className="popMatchFullPage">
            <div className={`popMatchContainer ${isDark? 'dark':''}`}>
                <div className="headerPopUp">
                    <CloseIcon onClick={props.togglePop} className='Popicon'/>
                    <div className="popMatchWinner">
                        <span className="winnerTitle">Select Winner</span>    
                    </div>

                    <div className="matchcardHeader">
                        <div className="matchCardCountry">
                            <img src={props.match.firstCountry.logo}  className="popMatchCardCountryImg" />
                            <span className='countryLabel'>{props.match.firstCountry.countryName}</span>
                            </div>

                        <div className="matchCardCountry flex popMatchCardCountryImg">
                            <div className=""><BalanceIcon /></div>
                            <span className='countryLabel'>Draw</span>
                        </div>
                        <div className="matchCardCountry">
                            <img  src={props.match.secondCountry.logo} alt={props.match.secondCountry.name} className="popMatchCardCountryImg" />
                            <span className='countryLabel'>{props.match.secondCountry.countryName}</span>
                            </div>
                    </div>
                </div>

                <div className="formContainerPopup">
                    <form>
                        <h2 className="expectResult">Expect Result</h2>
                        <div className="inputcontainer">
                            <input type="number" name="matchResult" id="result_1" className="result" />
                            <input type="number" name="matchResult" id="result_1" className="result" />
                            
                        </div>
                        <div className="matchCardPlayers">
                            <h2 className="countryLabel">Select Player from {props.match.firstCountry.countryName}</h2>
                            <div className="playersContainer">
                            {props.match.firstCountry.players.map((player,index)=>
                                <PlayerCardRadio countryOrder= 'firstCountry' player={player} key={index} />
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
                    </form>



                </div>

                
                
                {/* <div className="matchCardResult"></div> */}
            </div>

        </div>
   
        
        
     );
}
 
export default PopMatchCard;