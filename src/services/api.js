import axios from 'axios';

export const url = process.env.REACT_APP_API;
axios.defaults.baseURL = url;

export const getHistory = () => axios.get('/history').then((res) => res.data);
