import { useCallback, useEffect, useState } from 'react';
import SellerProduct from '../componentes/SellerProduct';
import NavBar from '../componentes/NavBar';

const { findSellerSales } = require('../Services/requests');

function SellerOrders() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSellerSales = useCallback(async () => {
    const response = await findSellerSales();
    console.log(response);
    setSales(response.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getSellerSales();
  }, [getSellerSales]);
  return (
    <div>
      <NavBar />
      { loading ? <p>Carregando...</p> : (
        sales.map((sale, index) => (
          <SellerProduct
            key={ sale.id }
            sales={ sale }
            orderId={ index + 1 }
          />
        ))
      ) }
    </div>
  );
}

export default SellerOrders;
