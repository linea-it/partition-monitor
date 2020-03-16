import React from 'react';
import Plotly from 'react-plotly.js';
import PropTypes from 'prop-types';

function Plot({ data, width }) {
  return (
    <Plotly
      data={data}
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
          title: 'Size',
          automargin: true,
          autorange: true,
          ticksuffix: 'TB',
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  width: PropTypes.number.isRequired,
};

export default Plot;
