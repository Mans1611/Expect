import React from 'react'
import { globalUser } from '../../Context/HomeContext';
import './feedbackNotification.scss';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';



const FeedbackNotification = ({setShowFeedBack}) => {

     const {isDark} = globalUser();
      localStorage.setItem("feedbackshow",true)


    return (
        <div className={`notification-container ${isDark ? 'dark' : ''}`}>
          <CloseIcon onClick = {()=> setShowFeedBack(false)} className='closeIcon'/>

          <div className="title-wrapper">
            <h2>Help Us To Improve</h2>
          </div>
          <div className="imgContainer">
            <img src="https://cdn-icons-png.flaticon.com/512/2038/2038898.png" className="feedBack-icon" />
          </div>
          <div className="button-wrapper">
            <Link to = "/feedback">
              <button className="feedback">
                Give Us Your FeedBack
              </button>
            </Link>
          </div>
        </div>
  )
}

export default FeedbackNotification