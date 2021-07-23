import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals';
import axios from 'axios'






// axios.defaults.headers.common['authorization']= 'Bearer'   +  localStorage.getItem('Token')
let Token=localStorage.getItem('Token')
axios.defaults.headers.common['authorization']= `Bearer ${Token}`

ReactDOM.render(
  <React.StrictMode>
 <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
