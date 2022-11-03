import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import ContextProvider from './context/ContextProvider';

import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routes>
          <Route path="/" element={ <Navigate to="/login" replace /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/customer/products" element={ <CustomerProducts /> } />
          <Route exact path="/customer/checkout" element={ <Checkout /> } />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
