
import MathchCard from '../../component/matchcards/MatchCard';
import { useState, useEffect, useContext } from 'react';
import Loading from '../../component/loading/big.loading/Loading';
import './match.scss';
import fetchData from '../../fetchData';
import NotFound from '../../component/NotFound/NotFound';
import { ThemeContext } from '../../App';
import { globalUser } from '../../Context/HomeContext';

const Matches = () => {
    const {isDark} = globalUser();
    const [data,setData] = useState([]);
    const [isLoading,setLoading] = useState(true);
    const [notFound,setNoutFound] = useState(false);
   useEffect( ()=>{
    return async () => {
        try{
            const matches = await fetchData('/matches/getmatches');
            setLoading(false);
            setData(matches);
            
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
                        </div>

                    </div>
                </div>
           )
           
            
            }
        </>
     );
}


export default Matches;