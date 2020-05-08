import axios from 'axios';

export const url = process.env.REACT_APP_API;
axios.defaults.baseURL = url;
let hash = btoa("fernando.silva:linea2019"); 
axios.defaults.headers.common.Authorization = "Basic " + hash;

export const getHistory = ({ offset, limit }) => {
  const params = {
    offset,
    limit,
  };

  return axios.get('/history', params).then(res => res.data);
};

export const getPartitionsByServer = server =>
  axios.get('/').then(res => res.data.filter(row => row.server === server));

export const getHistoryByServer = ({ server, offset, limit }) =>
  axios
    .get(`/history?server__eq=${server}&offset=${offset}&limit=${limit}`)
    .then(res => res.data);

export const getSizeByServerAndPartitionAndPeriod = ({
  server,
  partition,
  startDate,
  endDate,
  isToday,
}) => {
  var filterPartition = partition && partition !== 'All' ? `&mountpoint__contains=${partition}` : '';  
  if (isToday) {
    return axios
      .get(
        `/history?server__eq=${server}${filterPartition}&date__contains=${endDate}&cols=date,use,available`
      )
      .then(res => res.data);
  }
  return axios
    .get(
      `/history?server__eq=${server}${filterPartition}&date__range=${startDate},${endDate}&cols=date,use,available`
    )
    .then(res => res.data);
};
