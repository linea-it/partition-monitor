import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Plotly from 'react-plotly.js';
import { getHistoryServer } from '../../services/api';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  subtitle: {
    position: 'relative',
    top: '40px',
    zIndex: 2,
    left: '30px',
    height: 1,
  },
});

function GlobalVision({setTitle}) {

  const classes = useStyles();
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    setTitle('Global Vision');
    let array = [];
    getHistoryServer().then(res => {    
      res.data.map(history => {
        let arrayObject = array.filter(function( obj ) {
          return obj.title === history.server;
        });       
        if(arrayObject.length === 0){       
          let used = (history.total_use/1048576).toFixed(2);
          let free = (history.total_size/1048576 - history.total_use/1048576).toFixed(2)
          array.push({
            total: (history.total_size/1048576).toFixed(2),
            used: used,
            free: free,
            title: history.server,
            values: [free , used],
            marker: {
              colors: ['rgb(50,205,50)', 'rgb(175,0,0)']
            },
            labels: ['Free', 'Used'],
            type: 'pie',
            textinfo: 'label+percent',
            hoverinfo: 'label+percent',
            hole: .4,
          });
        }
      })
      array.sort(function (a, b) { return (a.title > b.title) ? -1 : (a.title < b.title) ? 1 : 0});
      setPlotData(array);
    });
  }, []);
  
  const postsItems = []
  // plotData.sort(function (a, b) {a.title > b.title ? 1 : a.title < b.title ? -1 : 0;});
  plotData.map((data) => {
    console.log(data);
    postsItems.push(
      <Grid item sm={12} md={6} xl={4}>
        <Typography variant="subtitle1" className={classes.subtitle} gutterBottom>
          {`Total: ${data.total}TB`}<br></br>
          {`Used: ${data.used}TB`}<br></br>
          {`Free: ${data.free}TB`}<br></br>
        </Typography>
        <Plotly
          data={[data]}
          layout= {{
            title: data.title,
            height: 400,
            width: 600,
            showlegend: false,
          }}
        />
      </Grid>
    )
  })

  return (
    <>
      <Grid container spacing={3}>
        {postsItems}
      </Grid>
    </>
  );
}

GlobalVision.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default (GlobalVision);
