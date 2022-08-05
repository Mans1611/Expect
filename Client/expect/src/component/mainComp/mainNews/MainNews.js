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
const MainNews = ()=> {

    const {isDark} = globalUser();
    const [news,setNews] = useState(null);
    const [isLoading,setLoading] = useState(true);
    const [mainNews,setMainNews] = useState(null);
    
    const navigate = useNavigate();
    

    useEffect(()=>{
        return async()=>{
            try{
                const response = await axios.get('/news/getnews')   
                setNews(response.data);
                setMainNews(response.data[0]) //  to pick the first news in the leatest news 
                setLoading(false);
            }catch(err){
                navigate('/register/signin');
                console.log(err);
                
            }
        }
    },[])


    const HandleMainNews = (event)=>{
            const index = event.target.className.split(' ')[1];
            setMainNews(news[index]);
            
    }
    return (
            <div className={`mainNews ${isDark?'dark':null}`}>
                {
                isLoading? 
                <SmallLaoding/>:
                <>
                    <div className="imageWrapper">
                        <img className= "mainImage" src={mainNews.img} alt={mainNews.title} />
                    </div>
                    <div className="newsText">
                        <h1 className="newsTitle">{mainNews.title}</h1>
                        <p className={` newsPara ${isDark?"dark":null} `}>{mainNews.paragraph}</p>
                    </div>

                    {
                        isLoading? <SmallLaoding/>: <SmallNews HandleMainNews = {HandleMainNews} news = {news}/>
                    }
              </> 
        }
        </div>
    )
}

export default MainNews;
