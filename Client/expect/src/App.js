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
import Wrapper from './adminPage/pages/Wrapper';
export const ThemeContext = createContext(true);


const  App = ()=> {

  return (
    <Router>
      <Provider children={(
      <MatchesProvider childern={(
        <ProtectedAdminProvider childern={

        
        <Routes>
          <Route path='/expect' element={<RequiredAuth childern={<><Navbar/><Footer/></>}/>}> 
            <Route path='matches' element={<RequiredAuth childern={<Matches/>}></RequiredAuth>}/>
            <Route path='home' element={<RequiredAuth childern={<Home/>}></RequiredAuth> }/>
            <Route path="myexpects" element={<RequiredAuth childern={<MyExpects/>}></RequiredAuth> }/>
            <Route path="standing" element={<RequiredAuth childern={<States/>}></RequiredAuth> }/>
            <Route path="myprofile/:userName" element={<MyProfile/>}/>
          </Route>
          
      {/* Regestirng pages */}
        <Route path='/welcome' element={<Welcome/>}></Route>
        <Route path="/register" element = {<Register/>}>
          <Route path='signin' element = {<SignIn/>}/>
          <Route path='signup' element = {<SignUp/>}/> 
        </Route>

      {/* Admin pages */}


        <Route path='/adminpage/login' element={<AdminLogin/>}/>
        <Route path='/adminpage/signup' element={<AdminSignUp/>}/>
        <Route exact path='/adminpage' element = {<HomeAdminPage/>}>       
            <Route path="account" element = {<Adminaccount/>}/>
            <Route path='dashboard' element={<DashBoard/>}/>
            <Route path='matches' element={<MathcesAdm/>}/>
            <Route path='statistics' element={<Statistics/>}/>
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
