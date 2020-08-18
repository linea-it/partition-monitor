import axios from 'axios';

export const url = process.env.REACT_APP_API;
axios.defaults.baseURL = url;

export const getPartitionsByServer = server =>
  axios.get(`/history?server__eq=${server}`).then(res => res.data.data.filter(row => row.server === server));


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