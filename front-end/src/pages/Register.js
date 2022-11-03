import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import requestLoginRegister from '../Services/requests';

function Register() {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [failedTryRegister, setFailedTryRegister] = useState(false);
  const history = useNavigate();

  const handleChange = ({ target: { value, name } }) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginRequeriments = () => {
    const PASSWORD_LIMIT_SIZE = 6;
    const NAME_LIMIT_SIZE = 12;
    const emailRegex = /\S+@\S+\.\S+/i;
    return registerData.name && registerData.name.length >= NAME_LIMIT_SIZE
      && emailRegex.test(registerData.email) && registerData.password
      && registerData.password.length >= PASSWORD_LIMIT_SIZE;
  };

  const messageError = 'Usuário já existente!';

  const register = async () => {
    const { name, email, password } = registerData;

    try {
      const { data } = await requestLoginRegister('/register', { name, email, password });
      console.log(data);
      if (data.token) {
        const userInfo = {
          name: data.name,
          email: data.email,
          role: data.role,
          token: data.token,
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
        history('/customer/products');
      }
    } catch (error) {
      console.log(error);
      setFailedTryRegister(true);
    }
  };

  return (
    <div className="data-register-form-container">
      <form>
        <label className="resgister-label" htmlFor="email-input">
          <h1>Cadastro</h1>
          <span>Nome</span>
          <input
            type="name"
            name="name"
            placeholder="Seu nome"
            value={ registerData.name }
            data-testid="common_register__input-name"
            onChange={ (event) => handleChange(event) }
          />
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="seu-email@site.com.br"
            value={ registerData.email }
            data-testid="common_register__input-email"
            onChange={ (event) => handleChange(event) }
          />
          <span>Senha</span>
          <input
            type="password"
            name="password"
            placeholder="**********"
            value={ registerData.password }
            data-testid="common_register__input-password"
            onChange={ (event) => handleChange(event) }
          />
          <button
            type="button"
            name="button"
            data-testid="common_register__button-register"
            disabled={ !loginRequeriments() }
            onClick={ () => register() }
          >
            CADASTRAR
          </button>
        </label>
      </form>
      {
        (failedTryRegister)
          ? (
            <p data-testid="common_register__element-invalid_register">
              {
                messageError
              }
            </p>
          )
          : null
      }
    </div>
  );
}

export default Register;
