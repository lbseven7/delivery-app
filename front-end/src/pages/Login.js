import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import requestLoginRegister from '../Services/requests';
import DeliveryContext from '../context/deliveryContext';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  const history = useNavigate();

  const { setUserInfo } = useContext(DeliveryContext);

  const handleChange = ({ target: { value, name } }) => {
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginRequeriments = () => {
    const PASSWORD_LIMIT_SIZE = 6;
    const emailRegex = /\S+@\S+\.\S+/i;
    return emailRegex.test(loginData.email) && loginData.password
      && loginData.password.length >= PASSWORD_LIMIT_SIZE;
  };

  const messageError = 'Usuário Inexistente!';

  const login = async () => {
    const { email, password } = loginData;

    try {
      const response = await requestLoginRegister('/login', { email, password });

      if (response.data.token) {
        setUserInfo(response.data);
        history('/customer/products');
      }
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  return (
    <div className="data-login-form-container">
      <form>
        <label className="login-label" htmlFor="email-input">
          <span>Login</span>
          <input
            type="email"
            name="email"
            placeholder="email@trybeer.com"
            value={ loginData.email }
            data-testid="common_login__input-email"
            onChange={ (event) => handleChange(event) }
          />
          <span>Senha</span>
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
            disabled={ !loginRequeriments() }
            onClick={ () => login() }
          >
            LOGIN
          </button>
          <button
            type="button"
            name="button"
            data-testid="common_login__button-register"
            onClick={ () => history('/register') }
          >
            Ainda não tenho conta
          </button>
        </label>
      </form>
      {
        (failedTryLogin)
          ? (
            <p data-testid="common_login__element-invalid-email">
              { messageError }
            </p>
          )
          : null
      }
    </div>
  );
}

export default Login;
