import React,{useState,useEffect} from 'react'
import Axios from '../../../Axios/axios'
import SmallLaoding from '../../../component/loading/small.loading/smallLoading'
import MatchState from '../../../component/MatchState/MatchState'

const RoundUserStanding = ({selectedRound,users}) => {
    

    // const[users,setUsers] =useState([])
    //     useEffect(()=>{
    //         setLoading(true)
    //         return async()=>{
    //             const {data} = await Axios.get(`/statistics/topusers/?round=${selectedRound}`);
    //             setUsers(data);
    //             setLoading(false);
    //             console.log(users);
    //         }
    // },[selectedRound])
    ;
  return (
    <div className='userStanding-admin'>
        <div className="standing-container">
            <div className="headerstandingwrapper">
                <h1 className="title">User Standing</h1>
                <h4>For {selectedRound}</h4>
            </div>
            <div className="standing-header row round">
                <span className="field">No</span>
                <span className="field">User Name</span>
                <span className="field">Round Points</span>
            </div>
            
                {
                    users.map((user,index)=><RoundUserRow key={index} order = {index+1} user = {user} />)
                }
                
        </div>
    </div>
    
  )
}
export const RoundUserRow = ({order,user,matchStanding,match,userExpect})=>{
    
    const [showMatchState,setShowMatchState] = useState(false);
    const handleShowState = ()=>{
        if(matchStanding){
            setShowMatchState(true);
        }
    }
    return(
        <>
            <div className='users-row' onClick={handleShowState}>
                <div className='row round'>
                    <span className="field">{order}</span>
                    <span className="field">{matchStanding ? user.userName : user._id}</span>
                    <span className="field">{matchStanding ? user.expects.userPoints : user.roundPoints}</span>
                </div>
            </div>
            {showMatchState && match && <MatchState match={match} 
                                            userExpect = {userExpect} 
                                            setPop = {setShowMatchState}
                                            expected = {true}
                                            />}
        </>
    )
}


export default RoundUserStanding