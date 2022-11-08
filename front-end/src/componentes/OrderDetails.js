import Proptypes from 'prop-types';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/deliveryContext';
import NavBar from './NavBar';

function OrderDetails() {
  const products = JSON.parse(localStorage.getItem('cartItems'));
  const { orders } = useContext(DeliveryContext);
  const {
    // deliveryAddress,
    // deliveryNumber,
    id,
    saleDate,
    // sellerId,
    status,
    totalPrice,
    // userId,
  } = orders;
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
    <>
      <NavBar />
      <div onClick={ () => onClick(orderId) } aria-hidden="true">
        <p
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          { `Pedido: ${id}` }
        </p>

        <p
          data-testid={
            `customer_order_details__element-order-details-label-delivery-status${id}`
          }
        >
          { status }
        </p>
        <button
          data-testid="customer_order_details__button-delivery-check"
          type="button"
          disabled="true"
        >
          MARCAR COMO ENTREGUE
        </button>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          { orderProductData(saleDate) }
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P. Vend: Fulana Pereira
        </p>
        <div>
          {
            products.map(({ name, quantity, price }, index) => (
              <div key={ index }>
                <p
                  data-testid={
                    `customer_order_details__element-order-table-item-number-${index}`
                  }
                >
                  Item
                  { index + 1 }
                </p>
                <p
                  data-testid={
                    `customer_order_details__element-order-table-name-${index}`
                  }
                >
                  Descrição
                  { name }
                </p>
                <p
                  data-testid={
                    `customer_order_details__element-order-table-quantity-${index}`
                  }
                >
                  Quantidade
                  { quantity }
                </p>
                <p
                  data-testid={
                    `customer_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  Valor Unitário
                  { price }
                </p>
                <p
                  data-testid={
                    `customer_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  Sub-total
                  { price * quantity }
                </p>
              </div>
            ))
          }
        </div>
        <p
          data-testid="customer_order_details__element-order-total-price"
        >
          {totalPrice.toFixed(2).replace('.', ',')}
        </p>
      </div>
    </>
  );
}

OrderDetails.propTypes = {
  orderId: Proptypes.number,
  id: Proptypes.string,
  status: Proptypes.string,
  saleDate: Proptypes.string,
  totalPrice: Proptypes.string,
}.isRequired;

export default OrderDetails;
