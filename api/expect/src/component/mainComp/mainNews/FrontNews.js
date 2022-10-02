import React, { useEffect, useState } from 'react'
import SmallNews from './SmallNews'

const FrontNews = ({mainNews,setMainNews,isDark,news,index}) => {
    
    console.log(news);

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
            <div className="smallNews-contsiner">
                <SmallNews  active ={index}  news = {news}/>
            </div>
        }
    </>
  )
}

export default FrontNews