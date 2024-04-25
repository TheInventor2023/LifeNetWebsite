// api.js
import axios from 'axios';
import {getCookie} from '@/Utils.js'

axios.defaults.baseURL = 'https://api.cytonic.net/'; // In prod it would be like -> https://api.cytonic.net/, in dev it should be "http://localhost:3000/"
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
