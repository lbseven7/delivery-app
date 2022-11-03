import React, { useState, useContext, useEffect } from 'react';
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
      const a = cartItems.map((pdt) => {
        if (pdt.id === prod.id) {
          return item;
        }
        return pdt;
      });
      localStorage.setItem('cartItems', JSON.stringify(a));
    } else {
      const addToCart = [...cartItems, { ...item }];
      localStorage.setItem('cartItems', JSON.stringify(addToCart));
    }
  };

  // essa função faz a soma do total
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const totalSum = cartItems?.reduce((acc, cur) => {
      const sum = acc + cur.quantity * cur.price;
      return sum;
    }, 0);
    console.log(totalSum);
  });

  const totalSum = () => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    if (!sumLocal) {
      localStorage.setItem('totalPrice', JSON.stringify(price));
      setTotal(price);
    }
    const sum = sumLocal + Number(price);
    localStorage.setItem('totalPrice', JSON.stringify(sum));
    setTotal(sum);
  };

  const totalReducePrice = () => {
    const sumTotal = JSON.parse(localStorage.getItem('totalPrice'));
    const sumReduce = sumTotal - Number(price);
    localStorage.setItem('totalPrice', JSON.stringify(sumReduce));
    setTotal(sumReduce);
  };

  const totalSumInput = (value, nameInput) => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    if (!sumLocal || nameInput === name) {
      localStorage.setItem('totalPrice', JSON.stringify(Number(price) * Number(value)));
      setTotal(Number(price) * Number(value));
      return 0;
    }
    const sumTotal = sumLocal + Number(price) * Number(value);
    localStorage.setItem('totalPrice', JSON.stringify(sumTotal));
    setTotal(sumTotal);
  };
  return (
    <span
      key={ id }
      className="card-product"
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
            totalReducePrice();
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
          onChange={ ({ target: { value, name: nameInput } }) => {
            setProductsButton(Number(value));
            totalSumInput(value, nameInput);
            sumItems(value, price);
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
          totalSum();
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
