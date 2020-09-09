import axios from 'axios';

export const url = process.env.REACT_APP_API;
axios.defaults.baseURL = url;
const jobs= [];

export const getPartitionsByServer = server =>
  axios.get(`/last?server__eq=${server}`).then(res => res.data.data);

export const getServerHistory = () => {
  const startDate = formatDate(new Date().setDate(new Date().getDate() - 31));
  const endDate = formatDate(new Date());
  return axios
    .get(`/server_history?&date__range=${startDate},${endDate}`)
    .then(res => {
      
      return res.data
    });
}

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

export const getServerHistory = () => {
  const startDate = formatDate(new Date().setDate(new Date().getDate() - 31));
  const endDate = formatDate(new Date());
  return axios
    .get(`/server_history?&date__range=${startDate},${endDate}`)
    .then(res => {
      
      return res.data
    });
}

export const getServerHistoryByName = (name) =>
  axios
    .get(`/server_history?server__eq=${name}`)
    .then(res => res.data);

const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}