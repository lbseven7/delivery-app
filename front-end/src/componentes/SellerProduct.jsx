import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SellerProduct(
  {
    sales: { id, userId, deliveryAddress, deliveryNumber, totalPrice, saleDate, status },
    orderId,
  },
) {
  const orderProductData = (data) => {
    const newData = data.split('-');
    const day = newData[2].split('T');
    const mouth = newData[1];
    const year = newData[0];

    return `${day[0]}/${mouth}/${year}`;
  };

  return (
    <div className="order-card">
      <Link to={ `/customer/orders/${id}` }>
        <p
          data-testid={ `seller_orders__element-order-id-${userId}` }
        >
          { orderId }
        </p>
        <p
          data-testid={ `seller_orders__element-delivery-status-${userId}` }
        >
          { status }
        </p>
        <p
          data-testid={ `seller_orders__element-order-date-${userId}` }
        >
          { orderProductData(saleDate) }
        </p>
        <p
          data-testid={ `seller_orders__element-card-price-${userId}` }
        >
          { totalPrice }
        </p>
        <p
          data-testid={ `seller_orders__element-card-address-${userId}` }
        >
          { `${deliveryAddress}, ${deliveryNumber}` }
        </p>
      </Link>
    </div>
  );
}

SellerProduct.propTypes = {
  seller: PropTypes.shape({
    userId: PropTypes.number,
    deliveryAddress: PropTypes.string,
    totalPrice: PropTypes.number,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }),
}.isRequired;

export default SellerProduct;
