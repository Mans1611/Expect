import './newscontainer.scss';
import React, { useEffect, useState } from 'react'
import Axios from '../../Axios/axios';
import { globalUser } from '../../Context/HomeContext';
import NewsCard from './NewsCard';

const NewsContainer = ({countryName,dark}) => {
    const [all_news,setAllNews] = useState([]);
   

    const {isDark} = globalUser();
    const [Dark,setDark] = useState(false);
    
    
    useEffect(()=>{
        let isSubscribe = true;
        if(dark){
            setDark(true)
        }

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
    },[countryName])

    useEffect(()=>{
       
        const news_container = document.getElementById('news_container');
        
        const observer = new IntersectionObserver(([entry])=>{
            const newsCards = document.querySelectorAll('.newsCard');
           
            if(entry.isIntersecting){
                // this for news card for laptops,as it will be grid
                if(window.innerWidth>600){
                    newsCards.forEach(newscard=>{
                        newscard.classList.add("show");
                    })
                }
                
                // this for news card for phones,as scrren is smaller and it will be flex.
                else{
                    newsCards.forEach(newscard=>{
                        newscard.classList.add("show");
                    })
                }
            }
        },{
            threshold : 0.5
        })

        observer.observe(news_container);
        
    },[countryName])

  return (
    <div id = "news_container" className={`news_container ${isDark?'dark':''} ${Dark?'dark':''}`}>
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