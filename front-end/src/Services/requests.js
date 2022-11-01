import axios from 'axios';

const getUrl = (route) => `http://localhost:3001${route}`;

const requestLoginRegister = async (endpoint, body) => {
  const routeUrl = getUrl(endpoint);
  const dataLogin = await axios.post(routeUrl, body);
  return dataLogin;
};

// const requestProducts = async (endpoint) => {
//   const routeUrl = url(endpoint);
//   const dataLogin = await axios.get(routeUrl);
//   return dataLogin;
// };

const requestProducts = async () => {
  try {
    const URL = getUrl('/products');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const response = await axios.get(URL, {
      headers: {
        Authorization: userInfo?.token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export default requestLoginRegister;
export { requestProducts };
