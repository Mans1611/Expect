import React from 'react'
import './whatisexpect.scss';
import { Link } from 'react-router-dom';
const WhatIsExpect = () => {
  document.title = "What is Expect";
  return (
    <div className='WhatIsExpect-page'>
        <div className="titleWrapper">
            <h1 className="Expect-title">Expect</h1>
        </div>
        <div className="content-container">
            <div className="box">
              <h3 className="box-title">What is Expect</h3>
              <p>Expect is a game which connect between the your expections and the real. Expect any game you select before it starts and collect points. Points are calculated depend on the Winner, Result and Players you can see rules <Link to="/welcome">here</Link></p>
            </div>
            <div className="box">
              <h3 className="box-title">Team</h3>
              <p> You can also create a team with your friends with maximum number of members is 5. Your Points collected togther and compete other teams  </p>
            </div>
        </div>
    </div>
  )
}

export default WhatIsExpect