import { useContext, useState } from 'react';
import './mainnews.scss';
import { globalUser } from '../../../Context/HomeContext';
import PopNews from './popNews/PopNews';

const SmallNews = (props) => {
    document.body.style.overflow = 'visible'

    const {isDark} = globalUser();
    return(
        <div   id='restNews' className='restNewsContainer'>
            { props.news.map((item,index)=>{

                const [popNews,setPopNews] = useState(false);
            return (
                <>
                    <div  onClick={()=>setPopNews(true)} key={index} className={`restNews ${isDark? 'dark' : ''} ${index} ${index === props.active ? 'active' : '' }`} >
                        <div className={`imageWrapper ${index}`}>
                            <img src={item.img} alt="" className={`image ${index}`} />
                        </div>
                        <div className={`text ${index}`}>
                            <h2 className={`title ${index} `}>{item.title}</h2>
                            <p className={`paragraph ${index} ${isDark?'dark':''}`}>{item.paragraph.slice(0,160)}...</p>
                        </div>
                    </div>

                    {popNews && <PopNews key = {index+3} news = {item} setPop={setPopNews}/>}
                </>
            )
        })}

        </div>
    
    )
}

 
export default SmallNews;