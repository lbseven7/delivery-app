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
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    role: '',
    token: '',
  });
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState({});
  const contextValue = useMemo(() => ({
    loginData,
    setLoginData,
    registerData,
    setRegisterData,
    userInfo,
    setUserInfo,
    products,
    setProducts,
    total,
    setTotal,
    orders,
    setOrders,
  }), [loginData, registerData, userInfo, products, total, orders]);

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
