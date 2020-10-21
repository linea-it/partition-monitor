import React from 'react';
import PropTypes from 'prop-types';
import Plotly from 'react-plotly.js';

function PiePlot({ title, width, height, data }) {
  console.log(data);
  return (
    <Plotly
      data={[data.dataTotal, data.dataPie]}
      layout= {{
        showlegend: true,
        title: title,
        height: height,
        width: 400,
        margin: {
          l: 0,
          t: 0,
          pad: 0
        },
        annotations: [
          {
            font: {
              size: 15
            },
            showarrow: false,
            text: title ,
          },
        ]
      }}
  />
  )
  
}

PiePlot.propTypes = {
    title: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    data: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
};

PiePlot.defaultProps = {
  width: 600,
  height: 300,
  title: ''
}

export default PiePlot;