import React from 'react'
import './index.css';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <>
    <div style={{display: 'flex'}}>
      <Link to="/"><div className='navElement'> Image / Logo </div></Link>
      <Link to="/plant"> <div className='navElement'> Plants </div> </Link>
      <Link to="/animal"> <div className='navElement'> Animals </div> </Link>
    </div>
    </>
  )
}

export default NavBar