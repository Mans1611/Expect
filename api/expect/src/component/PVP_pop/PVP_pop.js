import React from 'react'
import {globalUser} from '../../Context/HomeContext';
import Invitation from './component/Invitation';
import './pvppop.scss';

const PVP_pop = ({set_PVP_Pop,match}) => {

    document.body.style.overflow = 'hidden';
    const {isDark,userGlob,token,expectedMatches,setExpected} = globalUser();
    




    const hidePop = (e)=>{
        if(e.target.className === 'popMatchFullPage'){
            set_PVP_Pop(false);
        }
    }



   
    

  return (
    <div  onClick={hidePop}  className="popMatchFullPage">
        <div className={`popMatchContainer pvp ${isDark && 'dark'}`}>
           <Invitation matchId = {match.matchId}/>
        
        </div>
    </div>
  )
}

export default PVP_pop