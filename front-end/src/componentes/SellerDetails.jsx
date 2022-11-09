import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { findOrder, updateOrder } from '../Services/requests';

function SellerDetails() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPreparing, setPreparing] = useState(true);
  const [toDelivery, setDelivey] = useState(true);
  const devileryStatus = ['Pendente', 'Preparando', 'Em Trânsito'];

  const checkStatus = ({ status }) => {
    if (status === 'Pendente') {
      setPreparing(false);
      setDelivey(true);
    }
    if (status === 'Preparando') {
      setPreparing(true);
      setDelivey(false);
    }
    if (status === 'Em Trânsito') {
      setPreparing(true);
      setDelivey(true);
    }
    if (status === 'Entregue') {
      setPreparing(true);
      setDelivey(true);
    }
  };

  const getCustomerOrders = useCallback(async () => {
    const { data } = await findOrder(id);
    checkStatus(data[0]);
    setProducts(data);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getCustomerOrders();
  }, [getCustomerOrders, id]);

  const orderProductData = (data) => {
    const newData = data.split('-');
    const day = newData[2].split('T');
    const mouth = newData[1];
    const year = newData[0];

    return `${day[0]}/${mouth}/${year}`;
  };

  const changeStatus = async () => {
    setLoading(true);
    const index = devileryStatus.indexOf(products[0].status);
    const response = await updateOrder(id, { status: devileryStatus[index + 1] });
    checkStatus(response);
    getCustomerOrders();
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      { loading ? <p>Carregando...</p> : (
        <>
          <div>
            <p
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              { products[0].saleId }
            </p>
            <p
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              { orderProductData(products[0].saleDate) }
            </p>
            <p
              data-testid={
                `seller_order_details__element-order-details-label-delivery-status
                ${products[0].saleId}`
              }
            >
              { products[0].status }
            </p>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              disabled={ isPreparing }
              onClick={ changeStatus }
            >
              Preparando
            </button>

            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              disabled={ toDelivery }
              onClick={ changeStatus }
            >
              Saiu para entrega
            </button>
          </div>
          <div>
            {
              products.map(({ productName, quantity, price }, index) => (
                <div key={ index }>
                  <p
                    data-testid={
                      `seller_order_details__element-order-table-item-number-${index}`
                    }
                  >
                    Item
                    { index + 1 }
                  </p>
                  <p
                    data-testid={
                      `seller_order_details__element-order-table-name-${index}`
                    }
                  >
                    Descrição
                    { productName }
                  </p>
                  <p
                    data-testid={
                      `seller_order_details__element-order-table-quantity-${index}`
                    }
                  >
                    Quantidade
                    { quantity }
                  </p>
                  <p
                    data-testid={
                      `seller_order_details__element-order-table-unit-price-${index}`
                    }
                  >
                    Valor Unitário
                    { price }
                  </p>
                  <p
                    data-testid={
                      `seller_order_details__element-order-table-sub-total-${index}`
                    }
                  >
                    Sub-total
                    { (price * quantity).toFixed(2) }
                  </p>
                </div>
              ))
            }
            <p
              data-testid="seller_order_details__element-order-total-price"
            >
              {products[0].totalPrice.replace('.', ',')}
            </p>
          </div>
        </>
      ) }
    </>
  );
}

export default SellerDetails;
