import React from 'react'
import './teamSection.scss';
import TeamCompGif from '../../images/TeamComp.gif';

const TeamSection = () => {
  return (
    <div className='teamSection'>
        <div className="team_img_wrapper">
            <img src={TeamCompGif}/>
        </div>

    </div>
  )
}

export default TeamSection