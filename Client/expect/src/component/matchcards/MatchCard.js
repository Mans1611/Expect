import {  useContext, useState } from 'react';
import { connect } from 'react-redux';
import fetchData from '../../fetchData';
import Loading from '../loading/big.loading/Loading';
//import fetchData from '../../fetchData';
import PopMatchCard from '../popmatchcard/PopMatchCard';
import './matchcard.scss';
import { ThemeContext } from '../../App';
const MathchCard = (props) => {
    const [hours,setHours] = useState(0);
    const [min,setMin] = useState(0);
    const [sec,setSec] = useState(0);
    const [display,setDisplay] = useState(true); 
    const [pop,setPop] = useState(false);
    
    const togglePop = ()=>{
        setPop(!pop);
    }
    const {isDark} = useContext(ThemeContext); 
    
    
    // const counter = useCallback(()=>{   
    //     const time = props.match.time;
    //     setInterval(()=>{
    //         let current = new Date().getTime();
    //         let left = time-current;
    //         setHours(Math.floor(left/(1000*60*60)))
    //         setMin(Math.floor((left%(1000*60*60))/(1000*60)));
    //         setSec();
    //         if(hours<0)
    //             setDisplay(false)
    //     },1000)
    //     },[sec])
    // console.log(counter);
    return ( 
        <div className={`matchCard ${isDark?'dark':''}`}>
            
            
        
            <div className="matchcardHeader">
              <div className="matchCardCountry"> {/* country1.*/ }
                <img src={props.match.firstCountry.logo} alt="" className="matchCardCountryImg" />
                <span className='countryLabel'>{props.match.firstCountry.countryName}</span>
              </div>
                VS
                <div className="matchCardCountry">
                    <img src={props.match.secondCountry.logo} alt="" className="matchCardCountryImg" />
                    <span className='countryLabel'>{props.match.secondCountry.countryName}</span>
                </div>
            </div>
            { display &&
                <div className="matchCardCounter">
                    <span className="timeLeftLabel">Time Left:</span>
                    <span className="timeLeft">{hours}:{min}:{sec}</span>
                </div>
            }
                <div className="matchCardStart">
                    <button onClick={togglePop} className='matchCardbutton'>Expext</button>
                </div>
                
                {
                    pop && <PopMatchCard pop={pop} togglePop={togglePop} dark = {isDark} match={props.match}/>
                }
           </div>
     );
}
// const mapStateToProps = (state)=>{
//     return {
//         dark:state.dark,
//     }
// }

export default MathchCard;