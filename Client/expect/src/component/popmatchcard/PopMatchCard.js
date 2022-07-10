import './popupmatchcard.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Loading from '../loading/big.loading/Loading'
import PlayerCard from './playercard/PlayerCard';
import { ArrowBackOutlined,ArrowForwardOutlined } from '@mui/icons-material';
import BalanceIcon from '@mui/icons-material/Balance';
const PopMatchCard = (props) => { 
    let countries = document.getElementsByClassName('popMatchCardCountryImg');
    
    const [user,setUser] = useState({})
    const [winner,setWinner] = useState('draw');
    const element = useRef();
    

    useEffect(()=>{
        for(let i = 0; i<countries.length;i++){
            countries[i].addEventListener('click',function(){
                    let current = document.getElementsByClassName("selectedCount");
                    if(current[0])
                        current[0].className = current[0].className.replace(' selectedCount','');
                    this.className += ' selectedCount';
                    console.log(this);
                })
            }
        element.current.addEventListener('click',(e)=>{
            if(e.target.className === 'popMatchFullPage')
                props.togglePop(!props.pop);
        }) 
    },[])

    return (
        <div  ref={element}  className="popMatchFullPage">
            <div className={`popMatchContainer ${props.dark? 'dark':''}`}>
                <CloseIcon onClick={props.togglePop} className='Popicon'/>
                <div className="popMatchWinner">
                        <span className="winnerTitle">Select Winner</span>    
                </div>

                <div className="matchcardHeader">
                    <div className="matchCardCountry">
                        <img src={props.match.country1.logo}  className="popMatchCardCountryImg" />
                        <span className='countryLabel'>{props.match.country1.name}</span>
                        <input type="number" className='result'/>
                    </div>

                    <div className="matchCardCountry">
                    <div className="popMatchCardCountryImg"><BalanceIcon /></div>
                        <span className='countryLabel'>Draw</span>
                    </div>

                    <div className="matchCardCountry">
                        <img  src={props.match.country2.logo} alt={props.match.country2.name} className="popMatchCardCountryImg" />
                        <span className='countryLabel'>{props.match.country2.name}</span>
                        <input type="number" className='result'/>
                    </div>
                </div>
                {/* <div className="matchCardResult"></div> */}
                <div className="matchCardPlayers">
                    <span className="countryLabel">Select Player from {props.match.country1.name}</span>
                    <div className="playersContainer">
                    {props.match.country1.players.map(player=>{
                            return <PlayerCard player = {player}/>
                        })}
                    </div>
                    <span className="countryLabel"> Select Player from {props.match.country2.name}</span>
                    <div className="playersContainer">
                        {props.match.country2.players.map(player=>{
                            return <PlayerCard player = {player}/>
                        })}
                    </div>
                </div>
                <div className="buttonsWrapper">
                    <button className='matchCardButton cancel' >Cancel</button>
                    <button className='matchCardButton save' >Save</button>
                </div>
            </div>

        </div>
   
        
        
     );
}
 
export default PopMatchCard;