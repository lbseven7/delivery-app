import React, { useContext } from 'react';
import DeliveryContext from '../context/deliveryContext';

function Login() {
  const { loginData, setLoginData } = useContext(DeliveryContext);

  const handleChange = ({ target: { value, name } }) => {
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginRequiriments = () => {
    const PASSWORD_LIMIT_SIZE = 12;
    const emailRegex = /\S+@\S+\.\S+/i;
    return emailRegex.test(loginData.email) && password && password.length
      > PASSWORD_LIMIT_SIZE;
  };

  return (
    <div className="data-login-form-container">
      <form>
        <label className="login-label" htmlFor="email-input">
          <span>Login:</span>
          <input
            type="email"
            name="email"
            placeholder="email@trybeer.com"
            value={ loginData.email }
            data-testid="common_login__input-email"
            onChange={ (event) => handleChange(event) }
          />
          <input
            type="password"
            name="password"
            placeholder="**********"
            value={ loginData.password }
            data-testid="common_login__input-password"
            onChange={ (event) => handleChange(event) }
          />
          <button
            type="button"
            name="button"
            data-testid="common_login__button-login"
            disabled={ !loginRequiriments }
          >
            LOGIN
          </button>
          <button
            type="button"
            name="button"
            data-testid="common_login__button-register"
            disabled={ !loginRequiriments }
          >
            Ainda não tenho conta
          </button>
        </label>
      </form>
    </div>
  );
}

export default Login;
