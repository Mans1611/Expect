
import React, {useState} from 'react'
import ClipBoardCopy from '../../CreateTeam/ClipBoard';
import './MyTeam.scss';
import TeamDetail from './TeamDetail/TeamDetail';
import TeamTable from './TeamTable/TeamTable';

const MyTeam = () => {
  const [showClipBoard,setShowClipBoard] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  return (
    <div className='myteam-container'>
        <div className="myteamHeader">
            <div className="teamNameWrapper">
              <h5>Your Team:</h5>
              <h1 className="teamName">Mans1523</h1>
            </div>
            <div className="details">
              <TeamDetail detail={14} detailTitle={"Team Standing"}/>
              <TeamDetail detail={128} detailTitle={"Total poinst"}/>
              <TeamDetail detail={18} detailTitle={"Your Share"}/>
            </div>
        </div>
        <TeamTable/>
        <div className="options">
          <div className="button-Wrapper">
              <button  onClick={()=> setShowClipBoard(c=>!c)} className='button invite'>Invite Your Friends</button>
          </div>
          {showClipBoard && <ClipBoardCopy text={"mansjoaand"}/>}
          <div className="button-Wrapper">
              <button onClick={()=>setShowDelete(!showDelete)} className='button danger'>Leave Team</button>
          </div>
          {
            showDelete && 
            <div className="deleteWrapper">
              <button onClick={()=>setShowDelete(false)} className="green">Cancel</button>
              <button  className="danger">Confirm</button>
            </div>
          }
        </div>
    </div>
  )
}

export default MyTeam