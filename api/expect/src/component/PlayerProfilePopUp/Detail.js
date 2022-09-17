import React from 'react'

const Detail = ({img,detailTitle,detail}) => {
  return (
    <div className="detail">
        <img src={img}/>
        <h3>{detailTitle}</h3>
        <h1>{detail}</h1>
</div>
  )
}

export default Detail