import React from 'react'
import './index.css';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <>
    <div className="NavBar" style={{display: 'flex'}}>
      {/* <Link to="/"><div className='navElement'> Image / Logo </div></Link>
      <Link to="/plant"> <div className='navElement'> Plants </div> </Link>
      <Link to="/animal"> <div className='navElement'> Animals </div> </Link> */
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