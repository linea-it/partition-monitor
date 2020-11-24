import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { getServerHistory } from '../../services/api';
import { megabytesToSize, megabytesToTerabytesGraph } from '../../services/math';
import PiePlot from '../../components/Plot/PiePlot';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import styles from './styles';

function Dashboard({setTitle}) {
  const classes = styles();
  const [plotData, setPlotData] = useState([]);
  const [loading, setLoading] = useState(true);

  function arrayInsert (server, mbGraph) {
    setPlotData(prevState => ([...prevState , {
      title: server.server,
      dataPie: {
        values: [megabytesToTerabytesGraph(server.total_size - server.total_use) , megabytesToTerabytesGraph(server.total_use)],
        labels: ['Free:     '+ mbGraph.free, 'Used:    '+ mbGraph.used],
        name: "seats",
        hoverinfo :"label+percent+name",
        hole: .4,
        sort: false,
        type: "pie",
        marker: {
          colors: ['rgb(50,205,50)', 'rgb(175,0,0)']
        }
      },
      dataTotal: {
        values: [megabytesToTerabytesGraph(server.total_size)],
        labels: ['Total:    '+ mbGraph.total],
        name: "total",
        visible: "legendOnly",
        hole: .4,
        type: "pie",
      }
    }]))
  }

  useEffect(() => {
    setTitle('Dashboard');
  }, [setTitle]);

  useEffect(() => {
    getServerHistory().then(res => {
      // Get unique array of objects by a specific property
      const serverName = ['MS01', 'MS02', 'MS04','DESDB4','DESDB6','LUSTRE','FEROCKS','ALTIX','APOLLO', 'DTS'];
      const uniqueServerEntries = res.data.filter((obj, pos, arr) =>
        arr.map(mapObj => mapObj.server)
        .indexOf(obj.server) === pos
      )
      serverName.forEach(name => {
        const server = uniqueServerEntries.filter(obj => obj.server.toUpperCase() === name)[0];
        if (server) {        
          const mbGraph = {
            total: megabytesToSize(server.total_size),
            free: megabytesToSize(server.total_size - server.total_use),
            used: megabytesToSize(server.total_use)
          }
          arrayInsert(server, mbGraph);
        }
      });
      setLoading(false);
    });
  }, []);

  return loading ? <CircularProgress className={classes.circularProgress} /> : (
    <Grid container spacing={3}>
      {plotData.map((data) => (
        <Grid item md={12} lg={6} xl={4} key={data.title}>
          <Card className={classes.root}>
            <CardHeader title={'Server - ' + data.title} />
            <CardContent className={classes.height}>
              <PiePlot
                data={data}
                title={data.title}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

Dashboard.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default (Dashboard);
