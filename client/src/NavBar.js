import React from 'react'
import './index.css';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <>
    <div class="NavBar" style={{display: 'flex'}}>
      {/* <Link to="/"><div className='navElement'> Image / Logo </div></Link>
      <Link to="/plant"> <div className='navElement'> Plants </div> </Link>
      <Link to="/animal"> <div className='navElement'> Animals </div> </Link> */
      <ul class="nav nav-tabs">
      <li class="nav-item">
        <Link to="/"><a class="nav-link active" aria-current="page" href="#">Logo</a> </Link>
      </li>
      <li class="nav-item">
        <Link to="/plant"><a class="nav-link" href="#" id="plants">Plants</a></Link>
      </li>
      <li class="nav-item">
        <Link to="/animal"> <a class="nav-link" href="#" id="animals">Animals</a></Link>
      </li>

    </ul>}
    </div>
    </>
  )
}

export default NavBar