import { useState } from 'react';
import NavBar from '../componentes/NavBar';
import OrderProduct from '../componentes/OrderProduct';

function Order() {
  const [orders, setOrders] = useState([
    { orderId: 1, orderStatus: 'Entregue', orderDate: '01/01/2021', orderPrice: 10 },
    { orderId: 2, orderStatus: 'Entregue', orderDate: '01/02/2021', orderPrice: 10 },
    { orderId: 3, orderStatus: 'Entregue', orderDate: '01/04/2021', orderPrice: 10 },
  ]);

  // const getAllOrders = () => apiBase.get('/customer/orders');

  // useEffect(() => {
  //   async function getitems() {
  //     const { data } = await getAllOrders();
  //     console.log('result', data);
  //     setOrders(data);
  //   }
  //   getitems();
  // }, []);

  return (
    <div>
      <NavBar />
      <div className="card-orders-container">
        {
          orders.map((item, index) => (
            <OrderProduct
              { ...item }
              key={ item.orderId }
              index={ index }
            />
          ))
        }
      </div>
    </div>
  );
}

export default Order;
