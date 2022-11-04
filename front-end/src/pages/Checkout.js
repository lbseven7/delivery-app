import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/NavBar';
import CheckoutProduct from '../componentes/CheckoutProduct';

function Checkout() {
  const [cartCheckout, setCartCheckout] = useState(JSON
    .parse(localStorage.getItem('cartItems')) || []);

  const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));

  const history = useNavigate();

  return (
    <section>
      <Navbar />
      {
        cartCheckout.map((item, index) => (
          <CheckoutProduct
            setCartCheckout={ setCartCheckout }
            { ...item }
            key={ item.id }
            index={ index }
            totalPrice={ totalPrice }
          />
        ))
      }
      <h3
        data-testid="customer_checkout__element-order-total-price"
      >
        Total:
        {
          totalPrice.toFixed(2).replace('.', ',')
        }
      </h3>
      <select
        name=""
        id=""
        data-testid="customer_checkout__select-seller"
      >
        <option>
          Fulana Pereira
        </option>
      </select>
      <input
        data-testid="customer_checkout__input-address"
        id="adress"
        type="text"
        placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
      />
      <input
        data-testid="customer_checkout__input-address-number"
        id="adress-number"
        type="number"
        placeholder="198"
      />
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ () => history('/customer/orders/3') }
      >
        FINALIZAR PEDIDO
      </button>
    </section>
  );
}

export default Checkout;
