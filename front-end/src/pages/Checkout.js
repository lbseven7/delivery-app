import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../componentes/NavBar';
import CheckoutProduct from '../componentes/CheckoutProduct';
import { createSale } from '../Services/requests';
import DeliveryContext from '../context/deliveryContext';

function Checkout() {
  const [cartCheckout, setCartCheckout] = useState(JSON
    .parse(localStorage.getItem('cartItems')) || []);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  // const [seller, setSeller] = useState('');

  const { setOrders } = useContext(DeliveryContext);

  const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));

  const history = useNavigate();

  const finishOrder = async () => {
    const sale = {
      sellerId: 2,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: number,
      orders: cartCheckout.map(({ id, quantity }) => ({
        productId: id,
        quantity,
      })),
    };

    const { data } = await createSale(sale);
    if (data.message) {
      console.log(data.message);
    }
    setOrders(data);
    console.log(data);
    history(`/customer/orders/${data.id}`);
  };

  return (
    <section className="checkout">
      <NavBar />
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
        onChange={ ({ target: { value } }) => setAddress(value) }
      />
      <input
        data-testid="customer_checkout__input-address-number"
        id="adress-number"
        type="number"
        placeholder="198"
        onChange={ ({ target: { value } }) => setNumber(value) }
      />
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ finishOrder }
      >
        FINALIZAR PEDIDO
      </button>
    </section>
  );
}

export default Checkout;
