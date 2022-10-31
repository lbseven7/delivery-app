import React from 'react';
import { Link } from 'react-router-dom';

function CardButton() {
  return (
    <div>
      <Link to="/customer/checkout">
        <button
          type="submit"
          data-testid="customer_products__checkout-bottom-value"
        >
          Ver Carrinho: R$
        </button>
      </Link>

    </div>
  );
}

export default CardButton;
