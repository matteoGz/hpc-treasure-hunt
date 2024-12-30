import axios from 'axios';
import Cookies from 'js-cookie';



const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  config => {
    const token = Cookies.get('authToken');
    if(token)
      config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;