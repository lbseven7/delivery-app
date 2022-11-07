import { useState } from 'react';
import NavBar from '../componentes/NavBar';
import OrderProduct from '../componentes/OrderProduct';

function Order() {
  const [orders, setOrders] = useState([
    // { orderId: 1, orderStatus: 'Entregue', orderDate: '01/01/2021', orderPrice: 10 },
    // { orderId: 2, orderStatus: 'Entregue', orderDate: '01/02/2021', orderPrice: 10 },
    // { orderId: 3, orderStatus: 'Entregue', orderDate: '01/04/2021', orderPrice: 10 },
  ]);

  return (
    <div>
      <NavBar />
      <div className="card-orders-container">
        {
          orders.map(({ id, userId, orderStatus, orderDate, orderPrice }, index) => (
            <OrderProduct
              key={ id }
              orderId={ id }
              userId={ userId }
              order={ `${index + 1}` }
              orderStatus={ orderStatus }
              orderDate={ orderDate }
              orderPrice={ orderPrice }
            />
          ))
        }
        {/* {
          orders.map((item, index) => (
            <OrderProduct
              { ...item }
              key={ item.orderId }
              index={ index }
            />
          ))
        } */}
      </div>
    </div>
  );
}

export default Order;
