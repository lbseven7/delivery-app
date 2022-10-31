import axios from 'axios';

// require('dotenv/config');

// const { API_PORT } = process.env;

const url = (route) => `http://localhost:3001${route}`;

const requestLoginRegister = async (endpoint, body) => {
  const routeUrl = url(endpoint);
  const dataLogin = await axios.post(routeUrl, body);
  return dataLogin;
};

export default requestLoginRegister;
