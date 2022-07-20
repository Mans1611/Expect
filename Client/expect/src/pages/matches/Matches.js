
import MathchCard from '../../component/matchcards/MatchCard';
import { useState, useEffect, useContext } from 'react';
import Loading from '../../component/loading/big.loading/Loading';
import './match.scss';
import fetchData from '../../fetchData';
import NotFound from '../../component/NotFound/NotFound';
import { ThemeContext } from '../../App';
import { globalUser } from '../../Context/HomeContext';
import filteringExpects from './utilites/filteringExpects';
import axios from 'axios';
import Expected from './Component/Expected/Expected';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const Matches = () => {
    const {isDark} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [notFound,setNoutFound] = useState(false);
    const [expected,setExpected] = useState([]);
    const [timeUp, setTimeUp] = useState(false); 
    const cookie = new Cookies();
    const navigate = useNavigate();
    const {userGlob} = globalUser();

   useEffect( ()=>{
    
    return async () => {
        try{
            const token = cookie.get("token");
            if(!token)
                navigate('/register/signin');
            else{
                const response = await axios.get('/matches/getmatches');
                console.log("passed after request");
                console.log(userGlob);       
                const expectedResponse = await axios.get(`/expects/${userGlob}`); 
                const FilteredMatches = filteringExpects(response.data,expectedResponse.data);
                setData(FilteredMatches);
                console.log(FilteredMatches);
                setLoading(false);


            }
        }catch(err){
            setNoutFound(true);
            setLoading(false);  
        }
    } 
},[]);

   
    return ( 
            <>
           {isLoading? <Loading/>: (
               !data? <NotFound/>:
                <div className= {`match  ${isDark?'dark':''}` } >
                    <div className="matchWrapper">
                        <h1 className="matchTitle">UpComming Matches</h1>
                        <div className="matchCardContainer">
                            {/*
                                expected.map((value,index)=> <Expected timeUp={timeUp} setTimeUp={setTimeUp} dark={isDark} key={index} match ={value}/> )                                     
                            */}
                            {
                                data.map((value,key)=>{
                                    if(!value.expected) return <MathchCard timeUp={timeUp} setTimeUp={setTimeUp} dark={isDark} key={key} match ={value}/>;
                                    else { return <Expected key={key} match ={value}/> }
                                })
                            }
                        </div>

                    </div>
                </div>
           )
           
            
            }
        </>
     );
}


export default Matches;