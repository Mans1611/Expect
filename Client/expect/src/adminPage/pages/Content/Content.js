import {BrowserRouter as Router,Routes ,Route } from 'react-router-dom';
import Adminaccount from '../account/Adminaccount';
import DashBoard from '../Dashboard/DashBoard';
import MathcesAdm from '../Mathces/MathcesAdm';
import Statistics from '../statistics/Statistics';
import AddNews from '../AddNews/Add';
import './content.scss';
import UsersStanding from '../UsersStanding/UsersStanding';
import { useState } from 'react';
import FeedbackAdmin from '../Feedback/FeedbackAdmin';

const Content = () => {
    const [totalUsers,setTotalUsers] = useState([]);
    return (
        
            <div className="maxcontent">
                <Routes>
                    <Route path = "account" element = {<Adminaccount/>} />
                    <Route path="dashboard" element={<DashBoard/>}/>
                    <Route path='matches' element={<MathcesAdm/>}/>
                    <Route path='usersstanding' element={<UsersStanding setTotalUsers = {setTotalUsers} totalUsers = {totalUsers} />}/>
                    <Route path='statistics' element={<Statistics/>}/>
                    <Route path='news' element={<AddNews/>}/>
                    <Route path='feedback' element={<FeedbackAdmin/>}/>
                </Routes>
            </div>
     );
}
 
export default Content;