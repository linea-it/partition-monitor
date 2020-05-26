import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Plotly from 'react-plotly.js';
import { getHistoryServer } from '../../services/api';

function DetailedVerion({setTitle}) {

  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    setTitle('Datailed Version');
    let array = [];
    getHistoryServer().then(res => {    
      res.data.map(history => {
        let arrayObject = array.filter(function( obj ) {
          return obj.title === history.server;
        });       
        if(arrayObject.length === 0){        
          array.push({
            title: history.server,
            values: [(history.total_size/1048576 - history.total_use/1048576).toFixed(2) , (history.total_use/1048576).toFixed(2)],
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
    postsItems.push(
      <Grid item xs={6} sm={4}>
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

DetailedVerion.propTypes = {
  setTitle: PropTypes.func.isRequired,
};

export default (DetailedVerion);
