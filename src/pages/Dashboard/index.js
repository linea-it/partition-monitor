import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { getServerHistory } from '../../services/api';
import Typography from '@material-ui/core/Typography';
import { megabytesToSize, megabytesToTerabytesGraph } from '../../services/math';
import PiePlot from '../../components/Plot/PiePlot';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles';

function Dashboard({setTitle}) {
  const classes = styles();
  const [plotData, setPlotData] = useState([]);
  const [loading, setLoading] = useState(true);

  function arrayInsert (arr, server) {
    let position = ['MS01','MS04','DESDB4','DESDB6','LUSTRE','FEROCKS','ALTIX','APOLLO'].indexOf(server.server.toUpperCase());
    arr[position] = {
      total: megabytesToSize(server.total_size),
      used: megabytesToSize(server.total_use),
      free: megabytesToSize(server.total_size - server.total_use),
      title: server.server,
      values: [megabytesToTerabytesGraph(server.total_size - server.total_use) , megabytesToTerabytesGraph(server.total_use)],
      marker: {
        colors: ['rgb(50,205,50)', 'rgb(175,0,0)']
      },
      labels: ['Free', 'Used'],
      type: 'pie',
      textinfo: 'label+percent',
      hoverinfo: 'label+percent',
      hole: .4,
    }
  }

  useEffect(() => {
    setTitle('Dashboard');
  }, [setTitle]);

  useEffect(() => {
    getServerHistory().then(res => {
      // Get unique array of objects by a specific property:
      const uniqueServerEntries = res.data.filter((obj, pos, arr) =>
        arr.map(mapObj => mapObj.server)
        .indexOf(obj.server) === pos
      )
      let orderedArray = [];
      uniqueServerEntries.forEach ( (server, index) => {
        arrayInsert(orderedArray, server);
        if (uniqueServerEntries.length === index + 1) {
          setPlotData(orderedArray);
        };
      });

      setLoading(false);
    });
  }, []);

  return loading ? <CircularProgress className={classes.circularProgress} /> : (
    <Grid container spacing={3}>
      {plotData.map((data) => (
        <Grid item sm={12} md={6} xl={3} key={data.title}>
          <Typography variant="subtitle1" gutterBottom className={classes.labelPieChart}>
            {`Total: ${data.total}`}<br />
            {`Used: ${data.used}`}<br />
            {`Free: ${data.free}`}<br />
          </Typography>
          <PiePlot
            data={[data]}
            title={data.title}
          />
        </Grid>
      ))}
    </Grid>
  );
}

Dashboard.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default (Dashboard);