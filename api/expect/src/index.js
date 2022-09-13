import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes,Route, useNavigate } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

// this made to make the store is avalible in the app component (provider)





root.render(
    <React.StrictMode>  
      <App/>
    </React.StrictMode>

);


