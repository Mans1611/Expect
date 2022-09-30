import '../../pages/myProfile/myProfile.scss';
import { useContext ,useEffect,useState} from 'react';
import { ThemeContext } from '../../App';
import PostMatchCard from '../postMatchCard/PostMatchCard';
import axios from 'axios';
import filteringExpects from '../../pages/matches/utilites/filteringExpects';
import SmallLaoding from '../loading/small.loading/smallLoading';
import Expect from '../Expectes/Expect';
import { globalUser } from '../../Context/HomeContext';
import Axios from '../../Axios/axios';

const ProfileExpects = ({userName}) => {
    const [loading,setLoading] = useState(true);
    const [expected,setExpected] = useState([])
    const [userExpections,setUserExpections] = useState([]);
    const {isDark ,token,userGlob} = globalUser();


    useEffect(()=>{
        let isSubscribe = true;

        const fetchUserExpects = async()=>{
            try{
                const {data} = await Axios.get(`/expects/${userName}`,{
                    headers : {
                        token
                    }
                });
                // const matchesWithFlage = filteringExpects(data.matches,data.userExpections); // where we assign a flag to each expected match to be filtered again
                // const filterdExpectedMatches =  matchesWithFlage.filter(val=>val.expected); // where the full details about the match
                
                if(data.filterMatches){
                    const top3 = data.userExpections.filter(expect =>(expect.userPoints)).sort((a,b) => b.userPoints - a.userPoints ).slice(0,3);
                    if(isSubscribe){
                        setUserExpections(top3);
                        setExpected(data.filterMatches); // matches 
                        
                    }
                    
                }
                setLoading(false);

            }catch(err){
                console.log(err);
            }
            
        }
        fetchUserExpects();
        return () => isSubscribe = false;
    },[])
    
    

    return ( 
        <div className={`userExpectContainer ${isDark? 'dark' : ''}`}>
                <h1 className="profileTitle"> {userName === userGlob ? 'Your' : `${userName}'s`} Expects</h1>
                    {
                        loading? <SmallLaoding/> 
                        :
                        userExpections.length === 0 ? 
                        <div className="noContent">
                            No Expects Yet.
                        </div> 
                        :
                        <div className="expects-Container">
                            {
                             userExpections.map((val,index)=>{
                                    return <PostMatchCard 
                                    key = {index}
                                    userExpect= {val} 
                                    userName = {userName}
                                    setUserExpections = {setUserExpections} 
                                    match = {expected.find(match => match.matchId === val.matchId)} 
                                    />
                                })
                            }
                        </div>
                    }
                    
        </div>
     );
}
 
export default ProfileExpects;  