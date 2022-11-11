import React from 'react';
import logo from '../images/logo.png';

function Logo() {
  return (
    <div className="logo-fast-birita">
      <h1>
        <img
          className="logo"
          src={ logo }
          alt="logo"
        />
      </h1>
    </div>
  );
}

export default Logo;
