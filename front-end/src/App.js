import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import './styles/cardProducts.css';
import './styles/navBar.css';
import ContextProvider from './context/ContextProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerProducts from './pages/CustomerProducts';
import Checkout from './pages/Checkout';
import Order from './pages/Order';
import SellerOrders from './pages/SellerOrders';
import OrderDetails from './componentes/OrderDetails';
import SellerDetails from './componentes/SellerDetails';

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
          <Route exact path="/customer/orders" element={ <Order /> } />
          <Route exact path="/seller/orders" element={ <SellerOrders /> } />
          <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
          <Route exact path="/seller/orders/:id" element={ <SellerDetails /> } />
        </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
