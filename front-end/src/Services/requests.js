import axios from 'axios';

const getUrl = (route) => `http://localhost:3001${route}`;

const requestLoginRegister = async (endpoint, body) => {
  const routeUrl = getUrl(endpoint);
  const dataLogin = await axios.post(routeUrl, body);
  return dataLogin;
};

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

const createSale = async (body) => {
  try {
    const URL = getUrl('/sales');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const response = await axios.post(URL, body, {
      headers: {
        Authorization: userInfo?.token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const findSales = async () => {
  try {
    const URL = getUrl('/sales');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const response = await axios.get(URL, {
      headers: {
        Authorization: userInfo?.token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const findSellerSales = async () => {
  try {
    const URL = getUrl('/sales/seller');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const response = await axios.get(URL, {
      headers: {
        Authorization: userInfo?.token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const findOrder = async (id) => {
  try {
    const URL = getUrl(`/sales/orders/${id}`);
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const response = await axios.get(URL, {
      headers: {
        Authorization: userInfo?.token,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export {
  requestLoginRegister,
  requestProducts,
  createSale,
  findSales,
  findSellerSales,
  findOrder,
};
