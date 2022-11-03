import PropTypes from 'prop-types';

function CheckoutProduct({
  id,
  description,
  quantity,
  priceUnit,
  subTotal,
  setCartCheckoutRemove,
  index,
}) {
  const removeItemCart = () => {
    const cartCheckout = JSON.parse(localStorage.getItem('cartCheckout'));
    const newCartCheckout = cartCheckout.filter((item) => item.id !== id);
    localStorage.setItem('cartCheckout', JSON.stringify(newCartCheckout));
    setCartCheckoutRemove(newCartCheckout);
  };

  return (
    <div>
      <p
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        { index + 1 }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        { description }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { quantity }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { Number(priceUnit).toFixed(2).replace('.', ',') }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { subTotal.toFixed(2).replace('.', ',') }
      </p>
      <button
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
        type="button"
        onClick={ removeItemCart }
      >
        REMOVER
      </button>
    </div>
  );
}

CheckoutProduct.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  quantity: PropTypes.string,
  price: PropTypes.number,
  subTotal: PropTypes.number,
  setCart: PropTypes.func,
}.isRequired;

export default CheckoutProduct;
