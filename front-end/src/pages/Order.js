import { useCallback, useEffect, useState } from 'react';
import NavBar from '../componentes/NavBar';
import OrderProduct from '../componentes/OrderProduct';
import { findSales } from '../Services/requests';

function Order() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const userSales = useCallback(async () => {
    const response = await findSales();
    console.log(response);
    setSales(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    userSales();
  }, [userSales]);

  return (
    <div>
      <NavBar />
      {
        loading ? <p>Loading...</p> : (
          <div className="card-orders-container">
            {
              sales.map(({ id, status, saleDate, totalPrice }, index) => (
                <OrderProduct
                  key={ id }
                  orderId={ id }
                  order={ `${index + 1}` }
                  orderStatus={ status }
                  orderDate={ saleDate }
                  orderPrice={ totalPrice }
                />
              ))
            }
          </div>
        )
      }
    </div>
  );
}

export default Order;
