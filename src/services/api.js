import axios from 'axios';

export const url = process.env.REACT_APP_API;
axios.defaults.baseURL = url;

export const getHistory = () =>
  axios.get('/history')
    .then(res => res.data);

export const getHistoryByServer = server =>
  axios.get(`/history?server__eq=${server}`)
    .then(res => res.data);

export const getSizeByServerAndPeriod = ({ server, startDate, endDate }) =>
  axios.get(`/history?server__eq=${server}&date__range=${startDate},${endDate}&cols=date,size`)
    .then(res => res.data)
