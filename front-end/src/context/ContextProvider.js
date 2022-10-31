import React, { useMemo, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeliveryContext from './deliveryContext';

function ContextProvider({ children }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const contextValue = useMemo(() => ({
    loginData,
    setLoginData,
    registerData,
    setRegisterData,
  }), [loginData, registerData]);

  return (
    <DeliveryContext.Provider value={ contextValue }>
      { children }
    </DeliveryContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
