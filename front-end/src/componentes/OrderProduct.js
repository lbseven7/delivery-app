import Proptypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderProduct({
  orderId,
  order,
  orderStatus,
  orderDate,
  orderPrice,
}) {
  const history = useNavigate();

  const orderProductData = (data) => {
    const newData = data.split('-');
    const day = newData[2].split('T');
    const mouth = newData[1];
    const year = newData[0];

    return `${day[0]}/${mouth}/${year}`;
  };

  const onClick = (value) => {
    history(`/customer/orders/${value}`);
  };

  return (
    <div onClick={ () => onClick(orderId) } aria-hidden="true">
      <p
        data-testid={ `customer_orders__element-order-id-${orderId}` }
      >
        { `Pedido: ${order}` }
      </p>
      <p
        data-testid={ `customer_orders__element-delivery-status-${orderId}` }
      >
        { orderStatus }
      </p>
      <p
        data-testid={ `customer_orders__element-order-date-${orderId}` }
      >
        { orderProductData(orderDate) }
      </p>
      <p
        data-testid={ `customer_orders__element-card-price-${orderId}` }
      >
        {orderPrice}
      </p>
    </div>
  );
}

OrderProduct.propTypes = {
  orderId: Proptypes.number,
  order: Proptypes.string,
  orderStatus: Proptypes.string,
  orderDate: Proptypes.string,
  orderPrice: Proptypes.string,
}.isRequired;

export default OrderProduct;
