import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // to link the react with redux
import { createStore } from 'redux';
import Reducer from './store/Reducer';
const root = ReactDOM.createRoot(document.getElementById('root'));

// this made to make the store is avalible in the app component (provider)


const store = createStore(Reducer);



root.render(
  
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>

);


