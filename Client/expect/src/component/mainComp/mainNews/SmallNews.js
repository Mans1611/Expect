import { useContext } from 'react';
import './mainnews.scss';
import { ThemeContext } from '../../../App';
import { globalUser } from '../../../Context/HomeContext';

const SmallNews = (props) => {

    const {isDark} = globalUser();
    return(
        <div onClick={props.HandleMainNews}  id='restNews' className='restNewsContainer'>
            { props.news.map((item,index)=>{
            return (
                <div  key={index} className={`restNews ${isDark? 'dark' : ''} ${index} ${index === props.active -1 ? 'active' : '' }`} >
                    <div className={`imageWrapper ${index}`}>
                        <img src={item.img} alt="" className={`image ${index}`} />
                    </div>
                    <div className={`text ${index}`}>
                        <h2 className={`title ${index} `}>{item.title}</h2>
                        <p className={`paragraph ${index} ${isDark?'dark':''}`}>{item.paragraph}</p>
                    </div>
                    
                </div>
            )
        })}

        </div>
    
    )
}

 
export default SmallNews;