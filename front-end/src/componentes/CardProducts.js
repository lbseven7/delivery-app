import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import DeliveryContext from '../context/deliveryContext';

function CardProducts({ product }) {
  const { id, name, price, urlImage } = product;
  const [productsButton, setProductsButton] = useState(0);
  const { setTotal } = useContext(DeliveryContext);
  // saveLocalStorage();

  // useEffect(() => {

  // }, [totalSum, totalReducePrice, totalSumInput]);

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

  const totalSumInput = (value) => {
    const sumLocal = JSON.parse(localStorage.getItem('totalPrice'));
    if (!sumLocal) {
      localStorage.setItem('totalPrice', JSON.stringify(Number(price) * Number(value)));
      setTotal(Number(price) * Number(value));
    }
    const sumTotal = sumLocal + Number(price) * Number(value);
    localStorage.setItem('totalPrice', JSON.stringify(sumTotal));
    setTotal(sumTotal);
  };
  return (
    <span
      key={ id }
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
          onChange={ ({ target }) => {
            setProductsButton(Number(target.value));
            totalSumInput(target.value);
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
