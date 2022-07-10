import axios from 'axios';
import { useEffect, useState } from 'react';
import fetchData from '../../../fetchData';
import Loading from '../../loading/big.loading/Loading';
import SmallLaoding from '../../loading/small.loading/smallLoading';
import './mainnews.scss';
import SmallNews from './SmallNews.js'
import {useContext} from 'react';
import { ThemeContext } from '../../../App';
const MainNews = ()=> {
    const {isDark} = useContext(ThemeContext);

    const [news,setNews] = useState(null);
    const [isLoading,setLoading] = useState(true);
    const [mainNews,setMainNews] = useState(null);
    
    

    useEffect(()=>{
        return async()=>{
            try{
                const data = await fetchData('/news/getnews');
                setNews(data);
                setMainNews(data[0])
                setLoading(false);
            }catch(err){
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
