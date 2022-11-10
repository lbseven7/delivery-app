import React, { useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from '../context/deliveryContext';

function CardProducts({ product }) {
  const { id, name, price, urlImage } = product;
  const [productsButton, setProductsButton] = useState(0);
  const { setTotal } = useContext(DeliveryContext);

  const sumItems = async (quantity, prod) => {
    const item = {
      id: prod.id,
      name: prod.name,
      price: prod.price,
      urlImage: prod.urlImage,
      quantity,
    };

    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (!cartItems) {
      const newCartItem = [{ ...item }];
      return localStorage.setItem('cartItems', JSON.stringify(newCartItem));
    }

    if (cartItems.some((p) => p.id === prod.id)) {
      const updateProd = cartItems.map((pdt) => {
        if (pdt.id === prod.id) {
          return item;
        }
        return pdt;
      });
      localStorage.setItem('cartItems', JSON.stringify(updateProd));
    } else {
      const addToCart = [...cartItems, { ...item }];
      localStorage.setItem('cartItems', JSON.stringify(addToCart));
    }
  };

  const setTotalLocalStorage = async (totalSum) => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    console.log(totalSum);
    if (!sumLocal) {
      localStorage.setItem('totalPrice', JSON.stringify(totalSum));
      setTotal(totalSum);
    }
    localStorage.setItem('totalPrice', JSON.stringify(totalSum));
    setTotal(totalSum);
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const totalSum = cartItems?.reduce((acc, cur) => {
      const sum = acc + cur.quantity * cur.price;
      return sum;
    }, 0);

    if (totalSum) {
      setTotalLocalStorage(totalSum);
    }
  });

  const restoreQuantity = useCallback(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (cartItems) {
      cartItems?.some((p) => {
        if (p.id === id) {
          setProductsButton(p.quantity);
        }
        return false;
      });
    }
  }, [id]);

  useEffect(() => {
    restoreQuantity();
  }, [restoreQuantity]);

  return (
    <span
      key={ id }
      className="card-products"
    >
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
        width="100px"
        height="100px"
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }

      </p>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { price.replace('.', ',') }
      </p>
      <button
        name={ name }
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => {
          if (productsButton > 0) {
            setProductsButton(productsButton - 1);
            sumItems(productsButton - 1, product);
          }
        } }
      >
        -
      </button>
      <label htmlFor={ name }>
        <input
          name={ name }
          type="number"
          value={ productsButton }
          onChange={ ({ target: { value } }) => {
            if (value >= 0) {
              setProductsButton(Number(value));
              sumItems(value, product);
            }
          } }
          data-testid={ `customer_products__input-card-quantity-${id}` }
        />
      </label>
      <button
        name={ name }
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ () => {
          setProductsButton(productsButton + 1);
          sumItems(productsButton + 1, product);
        } }
      >
        +
      </button>
    </span>
  );
}

CardProducts.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};

export default CardProducts;
