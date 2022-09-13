import React, { useEffect, useState } from 'react'
import SmallNews from './SmallNews'

const FrontNews = ({mainNews,setMainNews,isDark,HandleMainNews,news}) => {
    const [index,setIndex]  = useState(0);

    useEffect(()=>{
        const changeNews = async ()=>{
            if(index === 3)
                setIndex(0);
            setMainNews(news[index]);
            
        }

        // const timeOut = setTimeout(()=>{
        //     if(index === 2){
        //         setIndex(0);
        //     }else{
        //         setIndex(index => index+1)
        //     }
        //     changeNews();
        // },6000);

        // clearTimeout(timeOut)

    },[index])



  return (
    <>
        <div className="imageWrapper">
            <img className= "mainImage" src={mainNews.img} alt={mainNews.title} />
        </div>
        <div className="newsText">
            <h1 className="newsTitle">{mainNews.title}</h1>
            <p className={` newsPara ${isDark?"dark":null} `}>{mainNews.paragraph}</p>
        </div>
        {
          <SmallNews active ={index} HandleMainNews = {HandleMainNews} news = {news}/>
        }
    </>
  )
}

export default FrontNews