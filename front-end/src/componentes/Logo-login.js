import React from 'react';
import logo from '../images/logo.png';

function Logo() {
  return (
    <div className="main-logo">
      <div className="left-logo">
        <img
          className="logo"
          src={ logo }
          alt="logo"
        />
      </div>
      <div className="right-logo">
        <h1><em>FastBirita</em></h1>
      </div>
    </div>
  );
}

export default Logo;
