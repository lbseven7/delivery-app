import { useState } from 'react';
import Navbar from '../componentes/NavBar';
import CheckoutProduct from '../componentes/CheckoutProduct';

function Checkout() {
  const [cartCheckout, setCartCheckout] = useState(JSON
    .parse(localStorage.getItem('cartCheckout')) || []);

  const totalPrice = cartCheckout
    .reduce((acc, curr) => Number(acc) + Number(curr.subTotal), 0);

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
      >
        FINALIZAR PEDIDO
      </button>
    </section>
  );
}

export default Checkout;
