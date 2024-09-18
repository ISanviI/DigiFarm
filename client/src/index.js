import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import App from './App';
import NavBar from './NavBar';
import Disease from './Disease';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <NavBar/>
      <Routes>
      <Route path='/' element = {<App />}/>
      <Route path='/:type' element = {<Disease />}/>
      </Routes>
    </Router>
  </React.StrictMode>
);