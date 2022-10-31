import React from 'react';
import PropTypes from 'prop-types';
// import DeliveryContext from '../context/deliveryContext';

function CardProducts({ id, name, price, image }) {
  const [productsButton, setProductsButton] = useState(0);

  return (
    <>
      <span
        key={ id }
      >
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ image }
          alt={ name }
        />
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}

        </p>
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {price}

        </p>
      </span>
      <div className="customer_products_button">
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ () => setProductsButton(productsButton - 1) }
        >
          -
        </button>
        <p data-testid={ `customer_products__input-card-quantity-${id}` }>
          { productsButton }
        </p>
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => setProductsButton(productsButton + 1) }
        >
          +
        </button>
      </div>
    </>
  );
}

CardProducts.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default CardProducts;
