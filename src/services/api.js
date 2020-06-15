import axios from 'axios';

export const url = process.env.REACT_APP_API;
axios.defaults.baseURL = url;
let hash = btoa("fernando.silva:linea2019"); 
axios.defaults.headers.common.Authorization = "Basic " + hash;


export const getPartitionsByServer = server =>
  axios.get('/').then(res => res.data.filter(row => row.server === server));


export const getHistoryByServerAndPartitionAndPeriod = ({
  server,
  partition,
  startDate,
  endDate,
}) => {
  const filter = partition === 'all' ? 
  {
    partition: '',
    api_base: 'server_history',
    cols: '',
  } : {
    partition: `&mountpoint__contains=${partition}`,
    api_base: 'history',
    cols: '&cols=date,use,available',
  }
  return axios
    .get(
      `/${filter.api_base}?server__eq=${server}${filter.partition}&date__range=${startDate},${endDate}${filter.cols}`
    )
    .then(res => res.data);
};

export const getServerHistory = () =>
  axios
    .get(`/server_history`)
    .then(res => res.data);


export const getServerHistoryByName = (name) =>
  axios
    .get(`/server_history?server__eq=${name}`)
    .then(res => res.data);