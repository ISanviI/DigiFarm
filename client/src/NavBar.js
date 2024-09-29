import React from 'react'
import './index.css';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <>
    <div className="NavBar" style={{display: 'flex'}}>
      {
      <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className="nav-link" aria-current="page" href="#"> Home </Link>
      </li>
      <li className="nav-item">
        <Link to="/plant" className="nav-link" href="#" id="plants"> Plants </Link>
      </li>
      <li className="nav-item">
        <Link to="/animal" className="nav-link" href="#" id="animals"> Animals </Link>
        {/* <Link to="/animal"> <a className="nav-link" href="#" id="animals">Animals</a></Link> */}
      </li>
      </ul>}
    </div>
    </>
  )
}

export default NavBar