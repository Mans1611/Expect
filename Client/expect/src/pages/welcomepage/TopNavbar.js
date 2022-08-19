import React from 'react'
import {Link} from 'react-router-dom'
const TopNavbar = () => {
  return (
        <div className="topnavbar">
            <div className="buttonscontainer">
                <h1>Expect</h1>
                <div className="buttonsWrapper">
                    <Link to='/register/signup' className="WelcomeNavbarButtons blueButton">Create Account</Link>
                    <Link to='/register/signin' className="WelcomeNavbarButtons">Sign In</Link>
                </div>
            </div>
        </div>
  )
}

export default TopNavbar