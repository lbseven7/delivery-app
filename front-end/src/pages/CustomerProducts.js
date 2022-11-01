import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/deliveryContext';
import { requestProducts } from '../Services/requests';

import CardButton from '../componentes/CardButton';
import Header from '../componentes/Header';
import CardProducts from '../componentes/CardProducts';

function CustomerProducts() {
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  const { products, setProducts, setTotal } = useContext(DeliveryContext);

  const getTotalPrice = useCallback(() => {
    const sum = JSON.parse(localStorage.getItem('totalPrice'));
    if (!sum) {
      return 0;
    }
    setTotal(Number(sum));
  }, [setTotal]);

  const fetchProducts = useCallback(async () => {
    const response = await requestProducts();
    if (response.message) {
      localStorage.clear();
      history('/login');
    }
    setProducts(response);
  }, [setProducts, history]);

  useEffect(() => {
    fetchProducts();
    getTotalPrice();
    setLoading(false);
  }, [fetchProducts, getTotalPrice]);

  return (
    <div className="data-customer-form-container">
      <Header />
      { loading ? <p>Carregando...</p> : (
        <div>
          { products.map((product) => (
            <CardProducts
              key={ product.id }
              product={ product }
            />
          )) }
          <CardButton />
        </div>
      )}
    </div>
  );
}

export default CustomerProducts;
