
import { ArrowDownward } from '@mui/icons-material';
import React from 'react'
import './playerPointsPage.scss'
const PlayerPointsPage = () => {
    document.title = "Players Points Calculations";
    document.body.style.overflow = "visible";
    const rules = [
        {img:"https://i.pinimg.com/originals/09/a6/e2/09a6e2dc9d294cf89a05b22b91639a34.jpg",text : "Scores a Gaol From Free-Kick",points : 6},
        {img:"https://www.thesun.co.uk/wp-content/uploads/2018/07/NINTCHDBPICT000415154293.jpg",text : "Scores a Goal Outside The Box ",points : 5, movingup : true},
        {img:"https://content.api.news/v3/images/bin/6c471049896db53711c073571322e025",text : "GoalKeeper Saves Penalty",points : 5, },
        {img:"https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/07/12/703644-mario-mandzukic-afp.jpg",text : "Scores a Gaol",points : 4},
        {img:"https://cdn.vox-cdn.com/thumbor/D8HPNYw8rTKIRqoy3uHmIlkcSGg=/0x0:4710x3054/1200x800/filters:focal(2040x1284:2792x2036)/cdn.vox-cdn.com/uploads/chorus_image/image/60235787/987862840.jpg.0.jpg",text : "Scores Gaol From Penalty",points : 3, movingup : true},
        {img:"https://cdn1.thechelseachronicle.com/uploads/17/2020/10/GettyImages-1229011943.jpg",text : "Makes An Assist",points : 3, movingup:true},
        {img:"https://cdn.vox-cdn.com/thumbor/Hh_jV2ppyyZdgHlMwTX6gDVAzAE=/0x0:4716x3240/1200x800/filters:focal(2123x1663:2877x2417)/cdn.vox-cdn.com/uploads/chorus_image/image/60208953/986165508.jpg.0.jpg",text : "Makes A Penalty",points : 2 ,movingup:true},
        {img:"https://www.independent.ie/incoming/2e430/30351765.ece/AUTOCROP/w1240h700/Robben_2940457b.jpg",text : "GoalKeapper Saves A Real Chance",points : 1},
        {img:"https://images.moneycontrol.com/static-mcnews/2018/07/fifa-pique-hand-ball.jpg",text : "Concedes Penalty ",points : -2},
        {img:"https://e00-marca.uecdn.es/assets/multimedia/imagenes/2018/07/15/15316695611344.jpg",text : "Scores an Own Goal",points : -3,movingup : true},
        {img:"https://content.api.news/v3/images/bin/cd97e492d999c838624eabaa7553e941",text : "Takes a Red Card",points : -4}
    ]

  return (
    <div className='PlayerPointsPage'>
        <div className="title">
             <h1>How can you get points from Players?</h1>
            <div className="scroll">
                <h6>Scroll Down</h6>
                <ArrowDownward/>
            </div>
        </div>
        {
            rules.map((rule,index)=>(
                <div key = {index} className="rule-container">
                    <div className={`background ${rule.points > 0 ? 'greend' : 'red'}`}></div>

                    <img className='cover' src={rule.img}/>
                    <div className="content">
                        <h2 className="sentence">{rule.text}</h2>
                        <h1 className="points">{rule.points} PTS</h1>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default PlayerPointsPage