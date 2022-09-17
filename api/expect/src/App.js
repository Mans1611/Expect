import './App.scss';
import Navbar from './component/navbar/Navbar';
import { BrowserRouter as Router, Routes,Route, useNavigate } from 'react-router-dom';
import Matches from './pages/matches/Matches';
import Home from './pages/home/Home';
import Welcome from './pages/welcomepage/WelcomePage';
import Register from './pages/register/Register';
import SignIn from './component/register/SignIn';
import SignUp from './component/register/SignUp';
import MyExpects from './pages/myexpects/MyExpect';
import HomeAdminPage from './adminPage/pages/HomePage/HomePage';
import DashBoard from './adminPage/pages/Dashboard/DashBoard';
import MathcesAdm from './adminPage/pages/Mathces/MathcesAdm';
import Statistics from './adminPage/pages/statistics/Statistics';
import Adminaccount from './adminPage/pages/account/Adminaccount';
import { createContext,useState } from 'react';
import Footer from './component/footer/Footer';
import MyProfile from './pages/myProfile/MyProfile';
import { globalUser, Provider } from './Context/HomeContext';
import RequiredAuth from './Auth/RequiredAuth';
import { MatchesProvider } from './adminPage/Context/matchesContext';
import NotFound from './pages/NotFound/NotFound';
import States from './pages/States/States';
import AdminLogin from './adminPage/pages/AdminLogin/AdminLogin';
import AdminSignUp from './adminPage/pages/AdminLogin/AdminSignUp';
import { ProtectedAdminProvider } from './adminPage/Context/ProtectedAdmin';
import AddNews from './adminPage/pages/AddNews/Add';
import Team from './pages/Team/Team';
import MyTeam from './component/TeamComponent/MyTeam/MyTeam';
import CreateJoinTeam from './component/TeamComponent/JoinCrateTeam/CreateJoinTeam';
import ProtectedAdminPage from './Context/ProtectedAdminPage';
import UsersStanding from './adminPage/pages/UsersStanding/UsersStanding';
import WhatIsExpect from './pages/WhatIsExpect/WhatIsExpect';
import CountryProfile from './pages/CountryProfile/CountryProfile';
import TeamProfile from './pages/TeamProfile/TeamProfile';
import FeedBack from './pages/FeedBack/FeedBack';
import Support from './pages/FeedBack/Support/Support';
import FeedbackAdmin from './adminPage/pages/Feedback/FeedbackAdmin';
import PlayerProfile from './pages/PlayerProfile/PlayerProfile';
export const ThemeContext = createContext(true);


const  App = ()=> {

  return (
    <Router>
      <Provider children={(
      <MatchesProvider childern={(
        <ProtectedAdminProvider childern={
        <Routes>
          <Route path='/' element={<RequiredAuth childern={<><Navbar/><Footer/></>}/>}> 
            <Route path='matches' element={<RequiredAuth childern={<Matches/>}></RequiredAuth>}/>
            <Route path='home' element={<RequiredAuth childern={<Home/>}></RequiredAuth> }/>
            <Route path="myexpects" element={<RequiredAuth childern={<MyExpects/>}></RequiredAuth> }/>
            <Route path="team" element={<RequiredAuth childern={<Team/>}></RequiredAuth> }>
              <Route path="myTeam" element = {<MyTeam />} />
              <Route path="teamjoin" element = {<CreateJoinTeam />} />
            </Route>
            
            <Route path="states" element={<RequiredAuth childern={<States/>}></RequiredAuth> }/>
            <Route path="myprofile/:userName" element={<MyProfile/>}/>
            
            {/* feed back pges ans support */ }
          </Route>

          <Route path='/support' element={<RequiredAuth childern={ <Support/> }> </RequiredAuth>} ></Route>
          
          <Route path='/feedback' element={<FeedBack/>} ></Route>
          <Route path="/teams/:teamName" element= {<RequiredAuth childern={<TeamProfile/>}></RequiredAuth>}></Route>
      
      {/* Regestirng pages */}
        <Route path='/welcome' element={<Welcome/>}></Route>
        <Route path='/whatisexpect' element={<WhatIsExpect/>}></Route>
        <Route path="/register" element = {<Register/>}>
          <Route path='signin' element = {<SignIn/>}/>
          <Route path='signup' element = {<SignUp/>}/> 
        </Route>
        <Route path='/country/:countryName' element={<CountryProfile/>} />
        <Route path='/expect/player/:countryName/:playerName' element={<PlayerProfile/>}/>
      {/* Admin pages */}

          <Route path='/adminpage/login' element={<AdminLogin/>}/>
          <Route path='/adminpage/signup' element={<AdminSignUp/>}/>

          <Route exact path='/adminpage' element = {<ProtectedAdminPage childern = {<HomeAdminPage/>}> </ProtectedAdminPage>}>  
              <Route path="account" element = {<ProtectedAdminPage childern={<Adminaccount/>}></ProtectedAdminPage>}/>
              <Route path='dashboard' element = {<ProtectedAdminPage childern={<DashBoard/>}></ProtectedAdminPage>}/>
              <Route path='matches' element = {<ProtectedAdminPage childern={<MathcesAdm/>}></ProtectedAdminPage>}/>
              <Route path='usersstanding' element = {<ProtectedAdminPage childern={<UsersStanding/>}> </ProtectedAdminPage>}/>
              <Route path='statistics' element = {<ProtectedAdminPage childern={<Statistics/>}></ProtectedAdminPage>}/>
              <Route path='news' element = {<ProtectedAdminPage childern={<AddNews/>}></ProtectedAdminPage>}/>
              <Route path='feedback' element = {<ProtectedAdminPage childern={<FeedbackAdmin/>}></ProtectedAdminPage>}/>
          
          </Route>

        <Route path='*' element = {<NotFound/>}/>
      </Routes> 
  }></ProtectedAdminProvider>
      )}>
      </MatchesProvider>
      )}>
      </Provider>
    </Router>
  );
}


export default App;
