import React, { useEffect,useReducer,useState } from 'react'
import Axios from '../../Axios/axios';
import {globalUser} from '../../Context/HomeContext';
import SmallLaoding from '../loading/small.loading/smallLoading';
import Invitation from './component/Invitation';
import PendingInvitiation from './component/PendingInvitiation';
import WaitingForOppnent from './component/WaitingForOppnent';
import './pvppop.scss';
import { pvpObject, PVP_Fn } from './Reducer/PVP_Reducer';

const PVP_pop = ({set_PVP_Pop,match}) => {

  const [isLoading,setLoading] = useState(true);
    document.body.style.overflow = 'hidden';
    const [pvpStatus,pvpDispatch] = useReducer(PVP_Fn,pvpObject);

    const {isDark,userGlob,token,expectedMatches,setExpected} = globalUser();
    
  useEffect(()=>{
    let isSubscribe = true
      const fetchPVP = async()=>{
      const {data} = await Axios.get(`/pvp/checkAvaliablePVP/${userGlob}/${match.matchId}`);
       
        if(isSubscribe){
          if( data.invitations.accepted === false){
            pvpDispatch({type : 'pendingInvitations' , payload : data.invitations });
           
          }
          else if ( data.invitations.accepted === true ){
            pvpDispatch({type : "Accepted", payload : data.invitations  })
          }

        }
        setLoading(false);

      }
      fetchPVP();
      ()=> isSubscribe = false;

  },[])



    const hidePop = (e)=>{
        if(e.target.className === 'popMatchFullPage'){
            set_PVP_Pop(false);
        }
    } 
    if(isLoading)

      return (
        <div  onClick={hidePop}  className="popMatchFullPage">
          <div className={`popMatchContainer pvp ${isDark && 'dark'}`}>
              <SmallLaoding/>
          </div>
        </div>
      ) 
    

  return (
    <div  onClick={hidePop}  className="popMatchFullPage">
        <div className={`popMatchContainer pvp ${isDark && 'dark'}`}>
          
          { pvpStatus.invitationStatus === null && <Invitation matchId = {match.matchId}/>}
          { pvpStatus.invitationStatus === 'Pending' && <PendingInvitiation invitation = {pvpStatus.invitation}/> }
          { pvpStatus.invitationStatus === 'Accepted' && <WaitingForOppnent  invitation = {pvpStatus.invitation} set_PVP_Pop = {set_PVP_Pop} match={match} /> }
          
        </div>
    </div>
  )
}

export default PVP_pop