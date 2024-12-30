import axios from 'axios';
import Cookies from 'js-cookie';
import { util } from '../utils/util';



const instance = axios.create({
  baseURL: util.getBackendUrl(),
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