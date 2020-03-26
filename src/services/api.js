import axios from 'axios';

export const url = process.env.REACT_APP_API;
axios.defaults.baseURL = url;

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
  if (isToday) {
    return axios
      .get(
        `/history?server__eq=${server}&mountpoint__contains=${partition}&date__contains=${endDate}&cols=date,use,available`
      )
      .then(res => {
        if (res.data.data.length > 0) {
          return res.data
        }

        return {
          data: [
            {
              available: null,
              date: endDate,
              use: null,
            }
          ],
          total_count: 0,
        };
      });
  }
  return axios
    .get(
      `/history?server__eq=${server}&mountpoint__contains=${partition}&date__range=${startDate},${endDate}&cols=date,use,available`
    )
    .then(res => {
      if (res.data.data.length > 0) {
        return res.data
      }

      return {
        data: [
          {
            available: null,
            date: startDate,
            use: null,
          },
          {
            available: null,
            date: endDate,
            use: null,
          }
        ],
        total_count: 0,
      };
    });
};
