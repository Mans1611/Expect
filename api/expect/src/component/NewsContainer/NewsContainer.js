import React, { useEffect, useState } from 'react'
import Axios from '../../Axios/axios';
import { globalUser } from '../../Context/HomeContext';
import NewsCard from './NewsCard';
import './newscontainer.scss';

const NewsContainer = ({countryName}) => {
    const [all_news,setAllNews] = useState([]);
    const [loading,setLoading] = useState(true);

    const {isDark} = globalUser();

    useEffect(()=>{
        let isSubscribe = true;

        const fetchNews = async()=>{
            try{
                const {data} = await Axios.get(`/news/getCountryNews/${countryName?countryName:''}`);
                if(isSubscribe)
                    setAllNews(data);
                
            }catch(err){
                console.log(err);
            }
        }
        fetchNews()
    },[])

  return (
    <div className={`news_container ${isDark?'dark':''}`}>
        {
            all_news.map((news,index)=>
                <NewsCard key={index} 
                          img={news.img} 
                          title = {news.title}
                          body = {news.paragraph}
                          />)
        }
    </div>
  )
}

export default NewsContainer