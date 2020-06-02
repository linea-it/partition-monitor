import React from 'react';
import Plotly from 'react-plotly.js';
import PropTypes from 'prop-types';

function Plot({ data, dataDisk, width }) {
  return (
    <Plotly
      data={[
        {
          ...dataDisk,
          name: 'Size Disk',
          mode: 'lines',
        }, {
          ...data,
          name: 'Use Disk',
          mode: 'lines',
        }
      ]}
      layout={{
        width,
        height: 'auto',
        title: 'Size per period',
        barmode: 'group',
        xaxis: {
          title: 'Date',
          automargin: true,
          autorange: true,
          type: 'date',
        },
        yaxis: {
          title: 'Size (TB)',
          automargin: true,
          autorange: true,
          ticksuffix: 'TB',
          nticks : 5,  
        },
        hovermode: 'closest',
        autosize: true,
      }}
      config={{
        scrollZoom: true,
        displaylogo: false,
        responsive: true,
      }}
    />
  );
}

Plot.propTypes = {
  data: PropTypes.objectOf(PropTypes.array).isRequired,
  dataDisk: PropTypes.objectOf(PropTypes.array).isRequired,
  width: PropTypes.number.isRequired,
};

export default Plot;
