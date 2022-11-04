import Proptypes from 'prop-types';

export default function OrderProduct({
  orderId,
  orderStatus,
  orderDate,
  orderPrice,
}) {
  return (
    <div>
      <p
        data-testid={ `customer_orders__element-order-id-${orderId}` }
      >
        Pedido:
        {' '}
        { orderId }
      </p>
      <p
        data-testid={ `customer_orders__element-delivery-status-${orderId}` }
      >
        Pendente:
        {' '}
        { orderStatus }
      </p>
      <p
        data-testid={ `customer_orders__element-order-date-${orderId}` }
      >
        { orderDate }
      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${orderId}` }
      >
        { Number(orderPrice).toFixed(2).replace('.', ',') }
      </p>
    </div>
  );
}

OrderProduct.propTypes = {
  orderId: Proptypes.number,
  orderStatus: Proptypes.string,
  orderDate: Proptypes.string,
  orderPrice: Proptypes.number,
}.isRequired;
