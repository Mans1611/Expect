  import React from 'react'
import { globalUser } from '../../Context/HomeContext'

const NewsCard = ({body,title,img}) => {
  const {userGlob,auth} = globalUser();

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