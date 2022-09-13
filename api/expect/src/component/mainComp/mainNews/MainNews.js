import axios from 'axios';
import { useEffect, useState } from 'react';
import fetchData from '../../../fetchData';
import Loading from '../../loading/big.loading/Loading';
import SmallLaoding from '../../loading/small.loading/smallLoading';
import './mainnews.scss';
import SmallNews from './SmallNews.js'
import {useContext} from 'react';
import { ThemeContext } from '../../../App';
import { globalUser } from '../../../Context/HomeContext';
import { useNavigate } from 'react-router-dom';
import Axios from '../../../Axios/axios';
import FrontNews from './FrontNews';
const MainNews = ()=> {

    const {isDark} = globalUser();
    const [news,setNews] = useState(null);
    const [isLoading,setLoading] = useState(true);
    const [mainNews,setMainNews] = useState(null);
    const navigate = useNavigate();
    

    useEffect(()=>{
        let isSubscribe = true;
        const fetchNews = async()=>{
            try{
                const response = await Axios.get('/news/getnews')   
                if(isSubscribe){
                    setNews(response.data);
                    setMainNews(response.data[0]) //  to pick the first news in the leatest news 
                }
                setLoading(false);
            }
            catch(err){
                navigate('/register/signin');
                console.log(err);   
            }
        }
        fetchNews();
        
        ()=> isSubscribe = false;


      
    },[])


    const HandleMainNews = (event)=>{
        const index = event.target.className.split(' ')[1];
        setMainNews(news[index]);
    }
    
    return (
            <div className={`mainNews ${isDark?'dark':''}`}>
                {
                isLoading? 
                <SmallLaoding/>:
                <>
                    <FrontNews 
                        mainNews={mainNews} 
                        isDark = {isDark}
                        news = {news}
                        setMainNews = {setMainNews}
                        HandleMainNews = {HandleMainNews}
                        />  
                </> 
        }
        </div>
    )
}

export default MainNews;
