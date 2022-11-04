import PropTypes from 'prop-types';

function CheckoutProduct({
  id,
  name,
  quantity,
  price,
  setCartCheckout,
  index,
}) {
  const subTotal = quantity * price;

  const totalReducePriceRemove = () => {
    const sumTotal = JSON.parse(localStorage.getItem('totalPrice'));
    const sumReduce = sumTotal - Number(subTotal);
    localStorage.setItem('totalPrice', JSON.stringify(sumReduce));
    setTotal(sumReduce);
  };

  const removeItemCart = () => {
    const cartCheckout = JSON.parse(localStorage.getItem('cartItems'));
    const newCartCheckout = cartCheckout.filter((item) => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(newCartCheckout));
    setCartCheckout(newCartCheckout);
    totalReducePriceRemove();
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
        { name }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        { quantity }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { Number(price).toFixed(2).replace('.', ',') }
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { subTotal.toFixed(2).replace('.', ',') }
        {/* sub-total */}
      </p>
      <button
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
        type="button"
        onClick={ () => removeItemCart() }
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
  setCartCheckoutRemove: PropTypes.func,
}.isRequired;

export default CheckoutProduct;
