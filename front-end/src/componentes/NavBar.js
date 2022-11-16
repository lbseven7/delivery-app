import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DeliveryContext from '../context/deliveryContext';

function NavBar() {
  const { userInfo } = useContext(DeliveryContext);

  return (
    <header>
      <nav className="nav-bar">
        <div className="nav-bar-box">
          <Link
            className="nav-link-products"
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </Link>
          <Link
            className="nav-link-orders"
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            MEUS PEDIDOS
          </Link>
        </div>
        <div className="nav-bar-box-name">
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {userInfo.name}
          </p>

          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
          >
            <button
              type="button"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
