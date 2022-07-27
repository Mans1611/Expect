import {BrowserRouter as Router,Routes ,Route } from 'react-router-dom';
import Adminaccount from '../account/Adminaccount';
import DashBoard from '../Dashboard/DashBoard';
import MathcesAdm from '../Mathces/MathcesAdm';
import Statistics from '../statistics/Statistics';
import './content.scss';

const Content = () => {
    return (
        
            <div className="maxcontent">
                {/* <Routes>
                    <Route path = "account" element = {<Adminaccount/>} />
                    <Route path="dashboard" element={<DashBoard/>}/>
                    <Route path='matches' element={<MathcesAdm/>}/>
                    <Route path='statistics' element={<Statistics/>}/>
                </Routes> */}
            </div>
     );
}
 
export default Content;