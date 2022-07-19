
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

const Matches = () => {
    const {isDark,userGlob} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [notFound,setNoutFound] = useState(false);
    const [expected,setExpected] = useState([]);

   useEffect( ()=>{
    return async () => {
        try{
            const response = await axios.get('/matches/getmatches');
            const expectedResponse = await axios.get(`/expects/${userGlob}`);
            
            const {arr1:FilteredMatches,expected:expectedFilter} = filteringExpects(response.data,expectedResponse.data);
            
            setData(FilteredMatches);
            setExpected(expectedFilter);
            setLoading(false);
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
                            {
                                data.map((value,key)=>{
                                    return (<MathchCard dark={isDark} key={key} match ={value}/>)   
                                })
                            }
                            {
                                expected.map((value,index)=>  <MathchCard dark={isDark} key={index} match ={value}/>)

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