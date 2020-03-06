import React, { useState, useEffect } from 'react';
import Plotly from 'react-plotly.js';
import PropTypes from 'prop-types';
// import useWindowSize from '../../hooks/useWindowSize';


function Plot({ data }) {
  const [plotWidth, setPlotWidth] = useState(0);
  // const windowSize = useWindowSize();

  // useEffect(() => {
  //   setPlotWidth(windowSize.width);
  // }, [windowSize]);

  return (
    <Plotly
      data={data}
      layout={{
        width: plotWidth,
        title: 'Size per period',
        xaxis: {
          title: 'Date',
          automargin: true,
          autorange: true,
        },
        yaxis: {
          title: 'Size (MB)',
          automargin: true,
          autorange: true,
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
  data: PropTypes.arrayOf(PropTypes.objects).isRequired,
};

export default Plot;
