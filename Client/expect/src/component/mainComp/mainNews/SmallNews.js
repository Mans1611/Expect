import { useContext } from 'react';
import './mainnews.scss';
import { ThemeContext } from '../../../App';

const SmallNews = (props) => {

    const {isDark} = useContext(ThemeContext);
    return(
        <div onClick={props.HandleMainNews}  id='restNews' className='restNewsContainer'>
            { props.news.map((item,index)=>{
            return (
                <div  key={index} className={`restNews ${index}`} >
                    <div className={`imageWrapper ${index}`}>
                        <img src={item.img} alt="" className={`image ${index}`} />
                    </div>
                    <div className={`text ${index}`}>
                        <h2 className={`title ${index}`}>{item.title}</h2>
                        <p className={`paragraph ${index} ${isDark?'dark':null}`}>{item.paragraph}</p>
                    </div>
                    
                </div>
            )
        })}

        </div>
    
    )
}

 
export default SmallNews;