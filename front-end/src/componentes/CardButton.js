import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DeliveryContext from '../context/deliveryContext';

function CardButton() {
  const { total } = useContext(DeliveryContext);

  return (
    <div className="card-btn">
      <Link to="/customer/checkout">
        <button
          className="btn-ver-carrinho"
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ total === 0 }
        >
          Ver Carrinho
        </button>
        <button
          className="btn-total"
          type="submit"
          data-testid="customer_products__checkout-bottom-value"
        >
          R$
          {' '}
          { total.toFixed(2).replace('.', ',') }
        </button>
      </Link>

    </div>
  );
}

export default CardButton;
