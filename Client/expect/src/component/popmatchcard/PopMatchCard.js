import './popupmatchcard.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState,useContext } from 'react';
import axios from 'axios';
import Loading from '../loading/big.loading/Loading'
import PlayerCard from './playercard/PlayerCard';
import { ArrowBackOutlined,ArrowForwardOutlined } from '@mui/icons-material';
import BalanceIcon from '@mui/icons-material/Balance';
import { ThemeContext } from '../../App';
const PopMatchCard = (props) => { 
    let countries = document.getElementsByClassName('popMatchCardCountryImg');
    
    const [user,setUser] = useState({})
    const [winner,setWinner] = useState('draw');
    const element = useRef();
    const {isDark} = useContext(ThemeContext); 

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

    return (
        <div  ref={element}  className="popMatchFullPage">
            <div className={`popMatchContainer ${isDark? 'dark':''}`}>
                <CloseIcon onClick={props.togglePop} className='Popicon'/>
                <div className="popMatchWinner">
                    <span className="winnerTitle">Select Winner</span>    
                </div>

                <div className="matchcardHeader">
                    <div className="matchCardCountry">
                        <img src={props.match.firstCountry.logo}  className="popMatchCardCountryImg" />
                        <span className='countryLabel'>{props.match.firstCountry.name}</span>
                        <input type="number" className='result'/>
                    </div>

                    <div className="matchCardCountry">
                        <div className="popMatchCardCountryImg"><BalanceIcon /></div>
                        <span className='countryLabel'>Draw</span>
                    </div>

                    <div className="matchCardCountry">
                        <img  src={props.match.secondCountry.logo} alt={props.match.secondCountry.name} className="popMatchCardCountryImg" />
                        <span className='countryLabel'>{props.match.secondCountry.name}</span>
                        <input type="number" className='result'/>
                    </div>
                </div>
                {/* <div className="matchCardResult"></div> */}
                <div className="matchCardPlayers">
                    <span className="countryLabel">Select Player from {props.match.firstCountry.name}</span>
                    <div className="playersContainer">
                    {props.match.firstCountry.players.map((player,index)=>{
                            return <PlayerCard key={index} player = {player}/>
                        })}
                    </div>
                    <span className="countryLabel"> Select Player from {props.match.secondCountry.name}</span>
                    <div className="playersContainer">
                        {props.match.secondCountry.players.map((player,index)=>{
                            return <PlayerCard key={index} player = {player}/>
                        })}
                    </div>
                </div>
                <div className="buttonsWrapper">
                    <button className='matchCardButton save' >Save</button>
                </div>
            </div>

        </div>
   
        
        
     );
}
 
export default PopMatchCard;