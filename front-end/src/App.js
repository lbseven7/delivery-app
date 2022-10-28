import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import ContextProvider from './context/ContextProvider';

import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routes>
          <Route path="/" element={ <Navigate to="/login" replace /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/customer/products" element={ <Login /> } />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
