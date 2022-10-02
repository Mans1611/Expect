import React from 'react'
import '../../../../.mainStyle.scss';
import CloseIcon from '@mui/icons-material/Close';
import { globalUser } from '../../../../Context/HomeContext';
import './popNews.scss';

import ReactDom from 'react-dom'
const PopNews = ({setPop,news}) => {
    const {isDark} = globalUser();

    document.body.style.overflow = 'hidden'
   
    const hidePop = (e)=>{
        if(e.target.className === 'popMatchFullPage'){
            setPop(false);
        }
    }

return ReactDom.createPortal( 
    <div onClick={hidePop} className="popMatchFullPage">
        <div id = 'popNewsContainer' className={`popMatchContainer ${isDark && 'dark'}`}>
            <CloseIcon onClick={()=> setPop(false)} className='Popicon'/>
            <div className="img-wrapper">
                <img src={news.img} alt={news.title}/>
            </div>
            <div className="conetent-wrapper">
                <h1>{news.title}</h1>
                <p>{news.paragraph}</p>
            </div>
        </div>
    </div>
  , document.getElementById('portal'))
}

export default PopNews