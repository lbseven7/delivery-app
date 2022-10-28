import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import ContextProvider from './context/ContextProvider';

import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routes>
          <Route exact path="/" element={ <Login /> } />
          <Route exact path="/login" element={ <Login /> } />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
