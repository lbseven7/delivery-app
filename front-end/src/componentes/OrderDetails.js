import Proptypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import NavBar from './NavBar';
import { findOrder } from '../Services/requests';

function OrderDetails() {
  const customer = useMatch('/customer/orders/:id');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCustomerOrders = useCallback(async () => {
    const { id } = customer.params;
    const { data } = await findOrder(id);
    setProducts(data);
    setLoading(false);
  }, [customer.params]);

  useEffect(() => {
    getCustomerOrders();
  }, [getCustomerOrders, customer]);

  // const onClick = (value) => {
  //   history(`/customer/orders/${value}`);
  // };

  const orderProductData = (data) => {
    const newData = data.split('-');
    const day = newData[2].split('T');
    const mouth = newData[1];
    const year = newData[0];

    return `${day[0]}/${mouth}/${year}`;
  };

  return (
    <>
      <NavBar />
      { loading ? <p>Carregando...</p> : (
        <div>
          <p
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { `Pedido: ${products[0].saleId}` }
          </p>

          <p
            data-testid={
              `customer_order_details__element-order-details-label-delivery-status
              ${products[0].saleId}`
            }
          >
            { products[0].status }
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
            { orderProductData(products[0].saleDate) }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            P. Vend:
            { products[0].name }
          </p>
          <div>
            {
              products.map(({ productName, quantity, price }, index) => (
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
                    { productName }
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
                    { (price * quantity).toFixed(2) }
                  </p>
                </div>
              ))
            }
          </div>
          <p
            data-testid="customer_order_details__element-order-total-price"
          >
            {products[0].totalPrice.replace('.', ',')}
          </p>
        </div>
      ) }
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
