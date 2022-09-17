import React from 'react'

const NewsCard = ({body,title,img}) => {
  return (
    <div className='newsCard'>
        <div className="img-wrapper">
            <img className='news-img' src={img}/>
        </div>
        <div className="body">
            <h2 className="title">{title.slice(0,80)}...</h2>
            <p className="paragraph">{body}</p>
        </div>
    </div>
  )
}

export default NewsCard