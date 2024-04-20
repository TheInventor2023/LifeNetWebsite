// api.js
import axios from 'axios';
import {getCookie} from '@/Utils.js'

axios.defaults.baseURL = 'http://localhost:3000/'; // In prod it would be like -> https://api.cytonic.net/
axios.defaults.responseType = 'json';

// Set the authentication token in the request headers for authenticated requests
axios.interceptors.request.use((config) => {
  const token = getCookie("authToken");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default axios;
