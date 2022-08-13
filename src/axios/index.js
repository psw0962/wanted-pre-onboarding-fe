import axios from 'axios';

const clientAxios = axios.create({
  baseURL: 'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/',
  headers: {
    Accept: 'application/json, text/plain, */*',
  },
});

clientAxios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default clientAxios;
